/* @flow */

import immutable from 'immutable'

export default (routeKey: string, state: Object): boolean => {
    const appState = state || immutable.Map()
    const modalRoutes = appState.getIn(['sceneNavigation', 'routes'], immutable.List())

    return Boolean(modalRoutes.find((route) => route.get('key') === routeKey))
}
