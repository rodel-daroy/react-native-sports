/* @flow */

import COLOR_CONSTANTS from './colorConstants'
import {onAppLaunch} from './appEventHandlers'
import React from 'react'
import routeMap from './routeMap'
import SceneNavigation from './sceneNavigation/SceneNavigation'
import store from './store'
import {
    App,
    createComponent,
    NetworkRequests,
    StyleSheet,
    Theme,
    View,
} from './RNFReact'

const {NetworkActivityIndicator} = NetworkRequests

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const theme = Theme.create({
    [Theme.ICON_COLOR]: COLOR_CONSTANTS.BXR_PRIMARY,
    [Theme.BRAND_PRIMARY]: COLOR_CONSTANTS.BXR_PRIMARY,
})

onAppLaunch()

export default createComponent({displayName: 'App'}, () => (
    <App
        store={store}
        theme={theme}
    >
        <View style={styles.container}>
            <NetworkActivityIndicator />
            <SceneNavigation routeMap={routeMap} />
        </View>
    </App>
))
