/* @flow */

import buttonStyleFromTheme from './buttonStyleFromTheme'
import createComponent from '../../createComponent'
import Indicator from './Indicator'
import THEME_CONSTANTS from '../../ThemeConstants'
import View from '../View'
import React from 'react';
import PropTypes from 'prop-types';
import TouchableButton, {propTypes as touchableButtonPropTypes} from './TouchableButton'
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    indicatorColor: PropTypes.string,
    showIndicator: PropTypes.bool,
    ...touchableButtonPropTypes,
}

export default createComponent({displayName: 'Button', injectTheme: true, propTypes}, ({
    indicatorColor,
    style,
    message,
    ...props
}, {theme}) => (
    <View>
        {props.showIndicator ?
            <Indicator
                color={indicatorColor || DefaultTheme[THEME_CONSTANTS.BUTTON_INDICATOR]}
                style={[buttonStyleFromTheme(theme, props), style]}
            /> :
                <TouchableButton
                    message={message}
                    style={style}
                    {...props}
                />}
    </View>
))
