/* @flow */

import CheckBox from '../CheckBox'
import createComponent from '../../createComponent'
import HorizontalLayout from '../HorizontalLayout'
import Row from '../Row'
import StyleSheet from '../../StyleSheet'
import ThemeConstants from '../../ThemeConstants'
import Touchable from '../Touchable'
import VerticalLayout from '../VerticalLayout'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const styles = StyleSheet.create({
    content: {
        padding: 8,
    },
    checkBoxContainer: {
        marginRight: 12,
    },
})

const propTypes = {
    onPress: PropTypes.func,
    ...Touchable.propTypes,
}

export default createComponent({displayName: 'AccessoryRow', injectTheme: true, propTypes}, ({
    checkBoxStyle,
    checked = false,
    children,
    hideAccessory,
    indeterminate = false,
    onAccessoryPress,
    onPress,
    rounded,
    ...props
}, {theme}) => (
    <Row
        {...props}
        onPress={onPress}
    >
        <HorizontalLayout
            verticalAlign
            weight={1}
        >
            <VerticalLayout weight={1}>
                {children}
            </VerticalLayout>
            <VerticalLayout
                horizontalAlign
            >
                {hideAccessory ? null : (
                    <VerticalLayout style={[styles.checkBoxContainer, {width: DefaultTheme[ThemeConstants.CHECKBOX_SIZE]}]}>
                        <CheckBox
                            checked={checked}
                            indeterminate={indeterminate}
                            onPress={onAccessoryPress ? onAccessoryPress : onPress}
                            rounded={rounded}
                            style={checkBoxStyle}
                        />
                    </VerticalLayout>
                )}
            </VerticalLayout>
        </HorizontalLayout>
    </Row>
))
