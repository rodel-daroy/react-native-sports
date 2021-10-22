/* @flow */

import Button from '../../Components/Button'
import createComponent from '../../createComponent'
import StyleSheet from '../../StyleSheet'
import VerticalLayout from '../../Components/VerticalLayout'

import React from 'react'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 24,
        width: 24,
        marginLeft: 10,
        marginRight: 10,
    },
})

const propTypes = {
    children: PropTypes.node,
    onBackPress: PropTypes.func,
}

export default createComponent({displayName: 'HeaderBackButton', propTypes}, ({
    children,
    onBackPress,
}) => (
    <Button
        onPress={onBackPress}
        style={styles.buttonContainer}
        transparent
    >
        <VerticalLayout
            horizontalAlign
            style={styles.button}
            verticalAlign
            weight={1}
        >
            {children}
        </VerticalLayout>
    </Button>
))
