/* @flow */

import createComponent from '../../createComponent'
import HorizontalLayout from '../../Components/HorizontalLayout'
import Icon from '../../Components/Icon'
import Platform from '../../Platform'
import React from 'react'
import StyleSheet from '../../StyleSheet'
import {switchToScene} from '../eventHandlers'
import Touchable from '../../Components/Touchable'
import VerticalLayout from '../../Components/VerticalLayout'
import View from '../../Components/View'
import {
    getObjectStyleFromRouteMap,
    getStringStyleFromRouteMap,
} from '../getStyleFromRouteMap'

const mapDispatchToProps = (dispatch) => ({
    onTabButtonTapped: (key) => dispatch(switchToScene(key)),
})

const tabBarStyle = Platform.OS === 'web' ? {width: 320} : {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        ...tabBarStyle,
        backgroundColor: 'red',
        height: 58,
        justifyContent: 'space-between',
    },
    tabBarButton: {
        backgroundColor: 'rgb(128, 128, 128)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const TabBarButton = createComponent({
    displayName: 'Tab Bar Button',
}, ({
    route,
    routeMap,
    isActiveTab,
    onTabButtonTapped,
    tabBarButtonStyle,
    tabBarButtonActiveColour = 'rgb(255, 255, 255)',
    tabBarButtonInactiveColour = 'rgb(0, 0, 0)',
}) => (
    <Touchable
        onPress={onTabButtonTapped}
        style={[styles.tabBarButton, tabBarButtonStyle]}
    >
        <Icon
            color={isActiveTab ? tabBarButtonActiveColour : tabBarButtonInactiveColour}
            iconSet='Fontawesome'
            name={routeMap.getIn([route.get('key'), 'tabIcon'])}
            size={32}
        />
    </Touchable>
))

const TabBar = createComponent({
    displayName: 'Tab Bar',
}, ({
    activeTabIndex,
    onTabButtonTapped,
    routeMap,
    routes,
    stackRootKey,
}) => {
    const getObjectStyle = getObjectStyleFromRouteMap(routeMap, stackRootKey)
    const getStringStyle = getStringStyleFromRouteMap(routeMap, stackRootKey)

    return (
        <HorizontalLayout style={[styles.tabBar, getObjectStyle('tabBarStyle')]}>
            {routes.map((route, index) => (
                <TabBarButton
                    isActiveTab={index === activeTabIndex}
                    key={route.get('key')}
                    onTabButtonTapped={() => onTabButtonTapped(route.get('key'))}
                    route={route}
                    routeMap={routeMap}
                    tabBarButtonActiveColour={getStringStyle('tabBarButtonActiveColour')}
                    tabBarButtonInactiveColour={getStringStyle('tabBarButtonInactiveColour')}
                    tabBarButtonStyle={getObjectStyle('tabBarButtonStyle')}
                />
            ))}
        </HorizontalLayout>
    )
})

export default createComponent({
    displayName: 'Tab Navigator',
    mapDispatchToProps,
}, ({
    route,
    routeMap,
    onTabButtonTapped,
}) => {
    const stackRootKey = route.get('key')
    const activeRoute = route.getIn(['routes', route.get('index')])
    const component = routeMap.getIn([activeRoute.get('key'), 'component'])
    const componentProps = activeRoute.has('routes') ? {route: activeRoute, routeMap, stackRootKey} : {stackRootKey}

    return (
        <VerticalLayout style={styles.container}>
            <View style={{flex: 1, backgroundColor: 'rgb(255, 255, 255)'}}>
                {React.createElement(component, componentProps)}
            </View>
            <TabBar
                activeTabIndex={route.get('index')}
                onTabButtonTapped={onTabButtonTapped}
                routeMap={routeMap}
                routes={route.get('routes')}
                stackRootKey={stackRootKey}
            />
        </VerticalLayout>
    )
})
