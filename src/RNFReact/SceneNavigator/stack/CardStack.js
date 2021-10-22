/* @flow */

import createComponent from '../../createComponent'
import React from 'react'
import StyleSheet from '../../StyleSheet'


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
    onBackPressed,
    routeMap,
    stackRootKey,
}) =>
     (
         <CardStack
             direction={direction}
             navigationState={navigationState}
             onNavigateBack={onBackPressed}
             renderHeader={renderOverlay(routeMap, stackRootKey, onBackPressed)}
             renderScene={renderScene(routeMap, stackRootKey)}
             style={styles.cardStack}
         />
    ),
)
