/* @flow */

export const getObjectStyleFromRouteMap = (routeMap, stackRootKey) => (styleKey) => {
    const style = routeMap.getIn([stackRootKey, 'styles', styleKey])

    return style ? style.toObject() : {}
}

export const getStringStyleFromRouteMap = (routeMap, stackRootKey) => (styleKey) => {
    const style = routeMap.getIn([stackRootKey, 'styles', styleKey])

    return style
}
