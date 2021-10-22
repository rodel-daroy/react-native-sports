/* @lflow */

// eslint-disable-next-line flowtype/require-valid-file-annotation
import {
    Button,
    createComponent,
    StyleSheet,
    VerticalLayout,
    Platform,
} from '../../RNFReact'
import React from 'react'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgb(0, 0, 0)',
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
        style={Platform.OS === "ios" ? styles.buttonContainer : [styles.buttonContainer, {height: 55}]}
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
