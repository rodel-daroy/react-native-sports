/* @flow */

import createComponent from '../../createComponent'
import defaultTo from '../../Utils/defaultTo'
import IconRow from '../IconRow'
import StyleSheet from '../../StyleSheet'
import Text from '../Text'
import ThemeConstants from '../../ThemeConstants'
import {Alert, NativeModules} from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const RNMail = NativeModules.RNMail

const propTypes = {
    buttonColor: PropTypes.string,
    children: PropTypes.any,
    defaultBody: PropTypes.string,
    defaultSubject: PropTypes.string,
    displayText: PropTypes.string,
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    isIconVisible: PropTypes.bool,
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 15,
        textAlign: 'left',
    },
})

const sendEmail = (email, defaultSubject, defaultBody, errorMessage) => {
    RNMail.mail({
        subject: defaultSubject,
        recipients: email ? [email] : [],
        body: defaultBody,
        isHTML: true,
    }, (error) => {
        if (error) {
            Alert.alert('Error', errorMessage)
        }
    })
}

export default createComponent({displayName: 'Email', injectTheme: true, propTypes}, ({
    buttonColor = 'rgb(0,0,0)',
    children,
    defaultBody,
    defaultSubject,
    displayText = '',
    email,
    errorMessage,
    isIconVisible = true,
}, {theme}) => (
    <IconRow
        iconAfterContent={false}
        iconColor={buttonColor}
        iconName='envelope'
        iconSize={20}
        isIconVisible={isIconVisible}
        onPress={() => sendEmail(email, defaultSubject, defaultBody, errorMessage)}
    >
        {
            children ? children :
                <Text style={[styles.buttonText, {color: defaultTo(buttonColor, DefaultTheme[ThemeConstants.BRAND_PRIMARY])}]}>
                    {displayText === '' ? email : displayText}
                </Text>
        }
    </IconRow>
))
