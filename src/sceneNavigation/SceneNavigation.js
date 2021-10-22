/* @flow */

import {bindActionCreators} from 'redux'
import {createComponent} from '../RNFReact'
import React from 'react'
import {
    KEY,
    popScene,
    popToRootScene,
    pushScene,
    replaceScene,
    switchToScene,
} from './sceneNavigationDuck'

const mapStateToProps = (state, ownProps) => ({
    sceneNavigation: ownProps.scene ? ownProps.scene.route : state.get('sceneNavigation'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        pushScene,
        popScene,
        popToRootScene,
        replaceScene,
        switchToScene,
    },
    dispatch,
)

export default createComponent({
    displayName: 'Scene Navigation',
    mapStateToProps,
    mapDispatchToProps,
    pure: true,
}, ({routeMap, sceneNavigation, ...props}) => {
    const navigationState = sceneNavigation.toJS()
    const rootKey = navigationState[KEY]

    return React.createElement(routeMap.getIn([rootKey, 'component']), {
        ...props,
        routeMap,
        sceneNavigation: navigationState,
        direction: routeMap.getIn([rootKey, 'stackDirection']) || 'horizontal',
    })
})
