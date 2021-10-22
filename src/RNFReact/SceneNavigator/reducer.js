/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {
    initialiseScenes,
    popScene,
    popToRootScene,
    pushScene,
    replaceScene,
    switchToScene,
    toggleMenuScene,
} from './actionCreators'

export const INDEX = 'index'
export const KEY = 'key'
export const ROUTES = 'routes'

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
    } else if (s.get(INDEX) === 0) {
        s.delete(INDEX)
        s.delete(ROUTES)
    } else {
        s.update(INDEX, (index) => index - 1)
        s.update(ROUTES, (routes) => routes.pop())
    }
})

const handlePopToRootScene = (state) => {
    const initialState = state.get('initialState')

    return initialState.set('initialState', initialState)
}

const findTargetIndexOfScene = (state, payload) => {
    const routeToKeyPathMap = createSceneToKeyPathMap(state)
    const {keyPath} = routeToKeyPathMap[payload]
    const parentKeyPath = keyPath.slice(0, -1)
    const childRoutes = state.getIn(parentKeyPath)

    return {
        parentKeyPath,
        targetIndex: childRoutes.findIndex((route) => route.get(KEY) === payload),
    }
}

const handleSwitchToScene = (state, {payload}) => state.withMutations((s) => {
    const {parentKeyPath, targetIndex} = findTargetIndexOfScene(state, payload)

    s.updateIn([...parentKeyPath.slice(0, -1), INDEX], () => targetIndex)
})

const handletoggleMenuScene = (state, {payload}) => state.withMutations((s) => {
    const {parentKeyPath, targetIndex} = findTargetIndexOfScene(state, payload)
    const currentIndex = s.getIn([...parentKeyPath.slice(0, -1), INDEX])

    if (currentIndex === targetIndex) {
        s.updateIn([...parentKeyPath.slice(0, -1), INDEX], () => 0)
    } else {
        s.updateIn([...parentKeyPath.slice(0, -1), INDEX], () => targetIndex)
    }
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

const handleInitialiseScenes = (state, {payload}) => payload.set('initialState', payload)

export default handleActions({
    [initialiseScenes]: handleInitialiseScenes,
    [popScene]: handlePopScene,
    [popToRootScene]: handlePopToRootScene,
    [pushScene]: handlePushScene,
    [replaceScene]: handleReplaceScene,
    [switchToScene]: handleSwitchToScene,
    [toggleMenuScene]: handletoggleMenuScene,
}, immutable.Map())
