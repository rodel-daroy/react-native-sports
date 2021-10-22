/* @flow */

import CardStack from './CardStack'
import createComponent from '../../createComponent'
import Header from './Header'
import HeaderBackButton from './HeaderBackButton'
import HeaderTitle from './HeaderTitle'
import HorizontalLayout from '../../Components/HorizontalLayout'
import Icon from '../../Components/Icon'
import immutable from 'immutable'
import {popScene} from '../eventHandlers'
import React from 'react'
import {getObjectStyleFromRouteMap, getStringStyleFromRouteMap} from '../getStyleFromRouteMap'

const renderScene = (routeMap, stackRootKey) => ({scene}) => ( // eslint-disable-line react/display-name, react/prop-types
    React.createElement(routeMap.getIn([scene.route.key, 'component']), scene.route.routes ? {
        routeMap,
        route: immutable.Map(scene.route),
        stackRootKey,
    } : {stackRootKey})
)

const renderTitleComponent = (routeMap, headerTextStyle) => (
    createComponent({displayName: 'TitleComponent'}, ({scene}) => {
        const centreComponent = routeMap.getIn([scene.route.key, 'centreComponent'])

        if (centreComponent) {
            return React.createElement(centreComponent)
        }

        return (
            <HeaderTitle
                title={routeMap.getIn([scene.route.key, 'titleText'])}
                titleStyle={headerTextStyle}
            />
        )
    })
)

const renderLeftComponent = (
    routeMap,
    onBackPressed,
    stackRootKey,
) => ({scene}) => { // eslint-disable-line react/display-name, react/prop-types, complexity
    const LeftComponent = routeMap.getIn([scene.route.key, 'leftComponent'])
    const hideLeft = routeMap.getIn([scene.route.key, 'hideLeftComponent'])
    const backButtonIconKeyPath = [stackRootKey, 'backButtonIcon']
    const backButtonIcon = routeMap.hasIn(backButtonIconKeyPath) ? routeMap.getIn(backButtonIconKeyPath).toJS() : null
    const getStringStyle = getStringStyleFromRouteMap(routeMap, stackRootKey)

    const BackButton = backButtonIcon || (
        <Icon
            color={getStringStyle('backButtonColour')}
            name='angle-left'
            size={25}
        />
    )

    return (
        <HorizontalLayout>
            {LeftComponent ? React.createElement(LeftComponent) : null}
            {
                (!hideLeft && scene.index > 0) && (
                    <HeaderBackButton onBackPress={onBackPressed}>
                        {BackButton}
                    </HeaderBackButton>
                )
            }
        </HorizontalLayout>
    )
}

const renderRightComponent = (routeMap) => ({scene}) => {  // eslint-disable-line react/display-name, react/prop-types
    const RightComponent = routeMap.getIn([scene.route.key, 'rightComponent'])

    if (!RightComponent) {
        return null
    }

    return <RightComponent />
}

const renderOverlay = (routeMap, stackRootKey, onBackPressed) => (props) => {  // eslint-disable-line react/display-name
    const doesStackHideNavBar = routeMap.getIn([stackRootKey, 'hideNavBar'])
    const doesRouteHideNavBar = routeMap.getIn([props.scene.route.key, 'hideNavBar'])   // eslint-disable-line react/prop-types
    const shouldHideNavBar = doesStackHideNavBar || doesRouteHideNavBar
    const getStyles = getObjectStyleFromRouteMap(routeMap, stackRootKey)

    if (shouldHideNavBar) {
        return null
    }

    return (
        <Header
            {...props}
            headerStyle={getStyles('headerStyle')}
            headerTextStyle={getStyles('headerTextStyle')}
            onBackPressed={onBackPressed}
            renderLeftComponent={renderLeftComponent}
            renderRightComponent={renderRightComponent}
            renderTitleComponent={renderTitleComponent}
            routeMap={routeMap}
            stackRootKey={stackRootKey}
        />
    )
}

const mapDispatchToProps = (dispatch, {route}) => {
    const stackToPopIn = route.key

    return {
        onBackPressed: () => dispatch(popScene({stackToPopIn})),
    }
}

const transformTopLevelRouteToMutableStructure = (route) => ({
    ...route.toObject(),
    routes: route.get('routes')
                 .map((route) => route.toObject())
                 .toArray(),
})

export default createComponent({
    displayName: 'Stack Navigator',
    mapDispatchToProps,
}, ({
    direction,
    route,
    routeMap,
    onBackPressed,
}) => (
    <CardStack
        direction={direction}
        navigationState={transformTopLevelRouteToMutableStructure(route)}
        onBackPressed={onBackPressed}
        renderOverlay={renderOverlay}
        renderScene={renderScene}
        routeMap={routeMap}
        stackRootKey={route.get('key')}
    />
))
