/* @flow */

import createComponent from '../../createComponent'
import Drawer from 'react-native-drawer'
import MenuOverlay from './MenuOverlay'
import React from 'react'
import StyleSheet from '../../StyleSheet'
import {switchToScene} from '../eventHandlers'
import View from '../../Components/View'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const mapDispatchToProps = (dispatch, {route}) => ({
    onCloseDrawer: () => dispatch(switchToScene(route.getIn(['routes', 0, 'key']))),
})

const drawerProps = {
    captureGestures: false,
    disabled: true,
    openDrawerOffset: 0.2,
    type: 'static',
}

const LeftDrawer = createComponent({displayName: 'LeftDrawer'}, ({
    children,
    leftComponent,
    stackRootKey,
    parentSelectedIndex,
}) => (
    <Drawer
        {...drawerProps}
        content={React.createElement(leftComponent, {stackRootKey})}
        open={parentSelectedIndex === 1}
        side='left'
    >
        {children}
    </Drawer>
))

const RightDrawer = createComponent({displayName: 'RightDrawer'}, ({
    children,
    rightComponent,
    stackRootKey,
    parentSelectedIndex,
}) => (
    <Drawer
        {...drawerProps}
        content={React.createElement(rightComponent, {stackRootKey})}
        open={parentSelectedIndex === 2}
        side='right'
    >
        {children}
    </Drawer>
))

const getRouteKeyPath = (index) => ['routes', index, 'key']
const getComponents = (route, routeMap) => ({
    centreComponent: routeMap.getIn([route.getIn(getRouteKeyPath(0)), 'component']),
    leftComponent: routeMap.getIn([route.getIn(getRouteKeyPath(1)), 'component']),
    rightComponent: routeMap.getIn([route.getIn(getRouteKeyPath(2)), 'component']),
})

export default createComponent({
    displayName: 'Drawer Navigator',
    mapDispatchToProps,
}, ({route, routeMap, onCloseDrawer}) => { // eslint-disable-line complexity
    const parentSelectedIndex = route.get('index')
    const stackRootKey = route.get('key')
    const {centreComponent, leftComponent, rightComponent} = getComponents(route, routeMap)
    const centreComponentProps = route.hasIn(['routes', 0, 'routes']) ? ({
        route: route.getIn(['routes', 0]),
        routeMap,
        stackRootKey,
    }) : {stackRootKey}

    const centreElements = (
        <View style={styles.container}>
            {React.createElement(centreComponent, centreComponentProps)}
            {parentSelectedIndex > 0 && <MenuOverlay onPress={onCloseDrawer} />}
        </View>
    )

    if (leftComponent && rightComponent) {
        return (
            <LeftDrawer
                leftComponent={leftComponent}
                parentSelectedIndex={parentSelectedIndex}
                stackRootKey={stackRootKey}
            >
                <RightDrawer
                    parentSelectedIndex={parentSelectedIndex}
                    rightComponent={rightComponent}
                    stackRootKey={stackRootKey}
                >
                    {centreElements}
                </RightDrawer>
            </LeftDrawer>
        )
    } else if (leftComponent) {
        return (
            <LeftDrawer
                leftComponent={leftComponent}
                parentSelectedIndex={parentSelectedIndex}
                stackRootKey={stackRootKey}
            >
                {centreElements}
            </LeftDrawer>
        )
    }

    return centreElements
})
