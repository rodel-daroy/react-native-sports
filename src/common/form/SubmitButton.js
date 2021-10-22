/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import SmallText from '../../common/text/SmallText'
import {
    ActivityIndicator,
    Button,
    createComponent,
    StyleSheet,
} from '../../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    text: {
        color: COLOR_CONSTANTS.BXR_SECONDARY,
    },
    disabledButton: {
        marginTop: 16,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 16,
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})
const propTypes = {
    buttonText: PropTypes.string,
    isFormComplete: PropTypes.bool,
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
}

export default createComponent({displayName: 'SubmitButton', propTypes}, ({ // eslint-disable-line complexity
    buttonText,
    isFormComplete,
    isLoading,
    style,
    onPress,
}) => {
    const shouldDisableButton = !isFormComplete || isLoading
    const buttonStyle = shouldDisableButton ?
      styles.disabledButton :
      styles.button

    return (
        <Button
            disabled={shouldDisableButton}
            onPress={onPress}
            style={[buttonStyle, style]}
        >
            {isLoading ?
                <ActivityIndicator
                    animating
                    color={COLOR_CONSTANTS.BXR_SECONDARY}
                    size='large'
                    style={styles.loader}
                /> :
                <SmallText
                    style={styles.text}
                >
                    {buttonText.toUpperCase()}
                </SmallText>
            }
        </Button>
    )
})
