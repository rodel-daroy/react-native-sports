/* @flow */

import CardStack from './CardStack' // eslint-disable-line import/no-unresolved
import Header from './Header' // eslint-disable-line import/no-unresolved
import HeaderBackButton from './HeaderBackButton'
import HeaderTitle from './HeaderTitle' // eslint-disable-line import/no-unresolved
import React from 'react'
import {createComponent, Icon} from '../../RNFReact'
import {
    popScene,
    pushScene,
    replaceScene,
} from '../sceneNavigationDuck'

const renderScene = (routeMap, props) => ({scene}) => // eslint-disable-line react/display-name, react/prop-types
    React.createElement(routeMap.getIn([scene.route.key, 'component']), {
        ...props,
        routeMap,
        scene,
        titleText: routeMap.getIn([scene.route.key, 'titleText']),
    })

const renderTitleComponent = (routeMap) => ({scene}) => ( // eslint-disable-line react/display-name, react/prop-types
    <HeaderTitle
        title={routeMap.getIn([scene.route.key, 'titleText'])}
    />
)

const renderLeftComponent = (routeMap, popScene) => ({scene}) => { // eslint-disable-line react/display-name, react/prop-types
    const hideLeft = routeMap.getIn([scene.route.key, 'hideLeftComponent'])

    return (
        !hideLeft && scene.index > 0 ?
            <HeaderBackButton onBackPress={popScene}>
                <Icon
                    color='rgb(255, 255, 255)'
                    name='chevron-left'
                    size={15}
                />
            </HeaderBackButton> : null
    )
}

const renderRightComponent = (routeMap, popScene) => ({scene}) => {  // eslint-disable-line react/display-name, react/prop-types
    const RightComponent = routeMap.getIn([scene.route.key, 'rightComponent'])

    return (
        RightComponent ?
            <RightComponent
                popScene={popScene}
            /> : null

    )
}

const renderOverlay = (routeMap, stackRootKey, popScene) => (props) => {  // eslint-disable-line react/display-name
    const doesStackHideNavBar = routeMap.getIn([stackRootKey, 'hideNavBar'])
    const doesRouteHideNavBar = routeMap.getIn([props.scene.route.key, 'hideNavBar'])   // eslint-disable-line react/prop-types
    const shouldHideNavBar = doesStackHideNavBar || doesRouteHideNavBar

    if (shouldHideNavBar) {
        return null
    }

    return (
        <Header
            {...props}
            popScene={popScene}
            renderLeftComponent={renderLeftComponent}
            renderRightComponent={renderRightComponent}
            renderTitleComponent={renderTitleComponent}
            routeMap={routeMap}
        />
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const stackRootKey = ownProps.scene ? ownProps.scene.route.key : ownProps.sceneNavigation.key

    return {
        pushScene: (scene, pushInto = stackRootKey) => {
            dispatch(pushScene({
                route: scene,
                pushInto,
            }))
        },
        popScene: () => {
            dispatch(popScene({
                stackToPopIn: stackRootKey,
            }))
        },
        replaceScene: (scene) => {
            dispatch(replaceScene({
                route: scene,
                replaceIn: stackRootKey,
            }))
        },
    }
}

export default createComponent({
    displayName: 'Stack Navigator',
    mapDispatchToProps,
}, ({
    direction,
    sceneNavigation,
    scene,
    routeMap,
    ...props
}) => (
    <CardStack
        {...props}
        direction={direction}
        navigationState={scene ? scene.route : sceneNavigation}
        renderOverlay={renderOverlay}
        renderScene={renderScene}
        routeMap={routeMap}
        stackRootKey={scene ? scene.route.key : sceneNavigation.key}
    />
))
