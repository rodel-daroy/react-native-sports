/* @flow */

import {
    ActivityIndicator,
} from 'react-native'
import createComponent from '../../createComponent'
import HorizontalLayout from '../HorizontalLayout'
import React from 'react'
import StyleSheet from '../../StyleSheet'
import THEME_CONSTANTS from '../../ThemeConstants'
import VerticalLayout from '../VerticalLayout'
import DefaultTheme from '../../defaultTheme';

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default createComponent({displayName: 'Indicator', injectTheme: true}, ({
    color,
    style,
}, {theme}) =>
     (
         <VerticalLayout style={[style, styles.indicator]}>
             <HorizontalLayout>
                 <ActivityIndicator
                     color={color || DefaultTheme[THEME_CONSTANTS.BRAND_PRIMARY]}
                     size='large'
                 />
             </HorizontalLayout>
         </VerticalLayout>
    ),
)
