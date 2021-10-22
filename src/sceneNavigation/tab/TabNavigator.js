/* @flow */

import colorConstants from '../../colorConstants'
import R from 'ramda'
import React from 'react'
import StackNavigator from '../stack/StackNavigator'
import {
    createComponent,
    HorizontalLayout,
    Icon,
    Image,
    Platform,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../../RNFReact'

const tabBarStyle = Platform.OS === 'web' ? {width: 320} : {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        ...tabBarStyle,
        backgroundColor: colorConstants.BXR_SECONDARY,
        height: 58,
        justifyContent: 'space-between',
    },
    tabBarButton: {
        backgroundColor: colorConstants.BXR_SECONDARY,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarIcon: {
        width: 35,
        height: 35,
    },
})

const TabBarButton = createComponent({
    displayName: 'Tab Bar Button',
}, ({
    route,
    routeMap,
    isActiveTab,
    onTabButtonTapped,
}) => (
    <Touchable
        onPress={onTabButtonTapped}
        style={styles.tabBarButton}
    >
        {
            routeMap.getIn([route.key, 'tabImage']) !== undefined ?
                <Image
                    source={routeMap.getIn([route.key, 'tabImage'])}
                    style={[styles.tabBarIcon, {tintColor: isActiveTab ? colorConstants.BXR_TEXT : colorConstants.BXR_PRIMARY}]}
                /> :
                <Icon
                    color={isActiveTab ? colorConstants.BXR_TEXT : colorConstants.BXR_PRIMARY}
                    iconSet='Fontawesome'
                    name={routeMap.getIn([route.key, 'tabIcon'])}
                    size={32}
                />
        }
    </Touchable>
))

const TabBar = createComponent({
    displayName: 'Tab Bar',
}, ({
    activeTabIndex,
    routes,
    routeMap,
    onTabButtonTapped,
}) => (
    <HorizontalLayout
        style={styles.tabBar}
    >
        {routes.map((route, index) => (
            <TabBarButton
                isActiveTab={index === activeTabIndex}
                key={route.key}
                onTabButtonTapped={() => onTabButtonTapped(route.key)}
                route={route}
                routeMap={routeMap}
            />
        ))}
    </HorizontalLayout>
))

const renderActiveScene = (routeMap, parentRoute, props) => {
    const activeScene = parentRoute.routes[parentRoute.index]

    const sceneNavigation = {
        index: R.isNil(activeScene.index) ? 0 : activeScene.index + 1,
        routes: activeScene.routes ? [{key: activeScene.key}, ...activeScene.routes] : [{key: activeScene.key}],
    }

    return (
        <StackNavigator
            {...props}
            isTab
            routeMap={routeMap}
            sceneNavigation={sceneNavigation}
            stackRootKey={activeScene.key}
        />
    )
}

export default createComponent({
    displayName: 'Tab Navigator',
}, ({
    scene,
    routeMap,
    switchToScene,
    ...props
}) => {
    const parentRoute = scene.route

    return (
        <VerticalLayout
            style={styles.container}
        >
            {renderActiveScene(routeMap, parentRoute, props)}
            <TabBar
                activeTabIndex={parentRoute.index}
                onTabButtonTapped={switchToScene}
                routeMap={routeMap}
                routes={parentRoute.routes}
            />
        </VerticalLayout>
    )
})
