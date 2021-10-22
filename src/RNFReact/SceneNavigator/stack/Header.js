/* @flow */

import createComponent from '../../createComponent'
import {} from 'react-native'
import React from 'react'

const {Header} = {}

export default createComponent({
    displayName: 'Header',
}, ({
    headerStyle,
    headerTextStyle,
    renderLeftComponent,
    renderRightComponent,
    renderTitleComponent,
    onBackPressed,
    routeMap,
    stackRootKey,
    ...props
}) => (
    <Header
        {...props}
        onNavigateBack={onBackPressed}
        renderLeftComponent={renderLeftComponent(routeMap, onBackPressed, stackRootKey)}
        renderRightComponent={renderRightComponent(routeMap, onBackPressed)}
        renderTitleComponent={renderTitleComponent(routeMap, headerTextStyle)}
        style={headerStyle}
    />
))
