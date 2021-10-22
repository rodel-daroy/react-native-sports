/* @flow */

import createComponent from '../../createComponent'
import defaultTo from '../../Utils/defaultTo'
import IconRow from '../IconRow'
import {phonecall} from 'react-native-communications'
import StyleSheet from '../../StyleSheet'
import Text from '../Text'
import ThemeConstants from '../../ThemeConstants'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    phone: PropTypes.string,
    displayText: PropTypes.string,
    withConfirmation: PropTypes.bool,
    buttonColor: PropTypes.string,
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 15,
        textAlign: 'left',
    },
})
const phonePressed = (phone, withConfirmation, onPress) => {
    if (onPress) {
        onPress()
    }
    phonecall(phone, withConfirmation)
}

export default createComponent({displayName: 'Phone', injectTheme: true, propTypes}, ({
    phone,
    onPress,
    displayText = '',
    withConfirmation = true,
    buttonColor = 'rgb(0,0,0)',
}, {theme}) => (
    <IconRow
        iconAfterContent={false}
        iconColor={buttonColor}
        iconName='phone'
        iconSize={20}
        onPress={() => phonePressed(phone, withConfirmation, onPress)}
    >
        <Text style={[styles.buttonText, {color: defaultTo(buttonColor, DefaultTheme[ThemeConstants.BRAND_PRIMARY])}]}>
            {displayText === '' ? phone : displayText}
        </Text>
    </IconRow>
))
