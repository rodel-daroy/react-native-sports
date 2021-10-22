/* @flow */

import {} from 'react-native'
import React from 'react'
import {createComponent, StyleSheet} from '../../RNFReact'

const {Header} = {}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'rgb(0, 0, 0)',
    },
})

export default createComponent({
    displayName: 'Header',
}, ({
    renderLeftComponent,
    renderRightComponent,
    renderTitleComponent,
    popScene,
    routeMap,
    ...props
}) => (
    <Header
        {...props}
        onNavigateBack={popScene}
        renderLeftComponent={renderLeftComponent(routeMap, popScene)}
        renderRightComponent={renderRightComponent(routeMap, popScene)}
        renderTitleComponent={renderTitleComponent(routeMap)}
        style={styles.headerContainer}
    />
))
