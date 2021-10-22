/* @flow */

import immutable from 'immutable'
import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const PUSH_SCENE = 'RNF/SCENE_NAVIGATION/PUSH_SCENE'
const POP_SCENE = 'RNF/SCENE_NAVIGATION/POP_SCENE'
const POP_TO_ROOT_SCENE = 'RNF/SCENE_NAVIGATION/POP_TO_ROOT_SCENE'
const SWITCH_TO_SCENE = 'RNF/SCENE_NAVIGATION/SWITCH_TO_SCENE'
const REPLACE_SCENE = 'RNF/SCENE_NAVIGATION/REPLACE_SCENE'

export const pushScene = createAction(PUSH_SCENE)
export const popScene = createAction(POP_SCENE)
export const popToRootScene = createAction(POP_TO_ROOT_SCENE)
export const switchToScene = createAction(SWITCH_TO_SCENE)
export const replaceScene = createAction(REPLACE_SCENE)

export const INDEX = 'index'
export const KEY = 'key'
export const ROUTES = 'routes'

const getInitialState = R.always(immutable.fromJS({
    [INDEX]: 0,
    [KEY]: 'modalStack',
    [ROUTES]: [
        {
            [INDEX]: 0,
            [KEY]: 'rootStack',
            [ROUTES]: [{[KEY]: 'home'}],
        },
    ],
}))

const createSceneToKeyPathMap = (route, currentKeyPath = []) => {
    const routes = route.get(ROUTES) || immutable.List()

    const childKeyPaths = routes.map((Aroute, index) => {
        const keyPath = [...currentKeyPath, ROUTES, index]

        return createSceneToKeyPathMap(Aroute, keyPath)
    }).reduce((reduction, current) => ({
        ...reduction,
        ...current,
    }), {})

    return {
        [route.get(KEY)]: {
            keyPath: currentKeyPath,
            route,
        },
        ...childKeyPaths,
    }
}

const createNewRoute = (routeKey, childRoutes) => (
    immutable.Map().withMutations((route) => {
        route.set(KEY, routeKey)

        if (childRoutes) {
            route.set(INDEX, 0)
            route.set(ROUTES, immutable.List(childRoutes.map((child) => createNewRoute(child))))
        }
    })
)

const handlePushScene = (state, {payload}) => {
    const {
        route: routeKey,
        pushInto,
        childRoutes,
    } = payload

    const routeToKeyPathMap = createSceneToKeyPathMap(state)
    const routeAlreadyExists = Boolean(routeToKeyPathMap[routeKey])

    if (routeAlreadyExists) {
        return state
    }

    const newState = state.updateIn(routeToKeyPathMap[pushInto].keyPath, (route) => {
        const routeToPush = createNewRoute(routeKey, childRoutes)

        return route
            .update(INDEX, (index = -1) => index + 1)
            .update(ROUTES, (routes = immutable.List()) => routes.push(routeToPush))
    })

    return newState
}

const handlePopScene = (state, {payload = {}} = {}) => state.withMutations((s) => {
    const {stackToPopIn} = payload

    if (stackToPopIn) {
        const routeToKeyPathMap = createSceneToKeyPathMap(state)
        const {keyPath} = routeToKeyPathMap[stackToPopIn]

        s.updateIn(keyPath, handlePopScene)
    } else if (s.get(ROUTES).count() > 1) {
        s.update(INDEX, (index) => index - 1)
        s.update(ROUTES, (routes) => routes.pop())
    }
})

const rootScenePath = [ROUTES, 0, ROUTES]

const getRootScene = (state) => state.getIn(rootScenePath).take(1)

const handlePopToRootScene = (state) => getInitialState().setIn(rootScenePath, getRootScene(state))

const handleSwitchToScene = (state, {payload}) => state.withMutations((s) => {
    const routeToKeyPathMap = createSceneToKeyPathMap(state)
    const {keyPath} = routeToKeyPathMap[payload]
    const parentKeyPath = keyPath.slice(0, -1)
    const childRoutes = state.getIn(parentKeyPath)
    const targetIndex = childRoutes.findIndex((route) => route.get(KEY) === payload)

    s.updateIn([...parentKeyPath.slice(0, -1), INDEX], () => targetIndex)
})

const handleReplaceScene = (state, {payload = {}} = {}) => {
    const {
        route: routeKey,
        replaceIn,
        childRoutes,
    } = payload

    const routeToKeyPathMap = createSceneToKeyPathMap(state)

    const newState = state.updateIn(routeToKeyPathMap[replaceIn].keyPath, (route) => {
        const routeToPush = createNewRoute(routeKey, childRoutes)

        return route.update(ROUTES, (routes = immutable.List()) => routes.pop().push(routeToPush))
    })

    return newState
}

export default handleActions({
    [PUSH_SCENE]: handlePushScene,
    [POP_SCENE]: handlePopScene,
    [POP_TO_ROOT_SCENE]: handlePopToRootScene,
    [SWITCH_TO_SCENE]: handleSwitchToScene,
    [REPLACE_SCENE]: handleReplaceScene,
}, getInitialState())
