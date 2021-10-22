/* @flow */

import {} from 'react-native'
import React from 'react'
import {createComponent, StyleSheet} from '../../RNFReact'

const {CardStack} = {}

const styles = StyleSheet.create({
    cardStack: {
        backgroundColor: 'rgb(0, 0, 0)',
    },
})

export default createComponent({
    displayName: 'Card Stack',
}, ({
    direction,
    renderOverlay,
    renderScene,
    navigationState,
    popScene,
    routeMap,
    ...props
}) => (
    <CardStack
        direction={direction}
        navigationState={navigationState}
        onNavigateBack={popScene}
        renderHeader={renderOverlay(routeMap, props.stackRootKey, popScene)}
        renderScene={renderScene(routeMap, {popScene, ...props})}
        style={styles.cardStack}
    />
))
