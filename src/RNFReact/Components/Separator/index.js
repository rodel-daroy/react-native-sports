/* @flow */

import createComponent from '../../createComponent'
import React from 'react'
import separatorStyle from './separatorStyle'
import ThemeConstants from '../../ThemeConstants'
import View from '../View'
import DefaultTheme from '../../defaultTheme';

const renderFullWidthSeparator = (fullWidthSeparator) => (
    fullWidthSeparator ? {marginLeft: 0} : null
)

export default createComponent({displayName: 'Separator', injectTheme: true}, ({
    fullWidthSeparator,
    style,
    ...props
}, {theme}) => (
    <View
        {...props}
        style={[
            separatorStyle.separator,
            {borderColor: DefaultTheme[ThemeConstants.ROW_SEPARATOR_COLOUR]},
            renderFullWidthSeparator(fullWidthSeparator),
            style,
        ]}
    />
))
