import {ActivityIndicator, Button, createComponent, StyleSheet} from "../RNFReact";
import React from "react";
import COLOR_CONSTANTS from "../colorConstants";

const styles = StyleSheet.create({
    button: {
        marginTop: 1,
        borderRadius: 0,
    },
    disabledButton: {
        marginTop: 1,
        borderRadius: 0,
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
});

export default createComponent({displayName: 'ActionButton'}, ({
                                                                   isEnable,
                                                                   isLoading,
                                                                   onPress,
                                                                   buttonText,
                                                               }) => {
    const shouldDisableButton = !isEnable || isLoading;
    const buttonStyle = shouldDisableButton ? styles.disabledButton : styles.button;
    return (
        <Button
            disabled={shouldDisableButton}
            onPress={onPress}
            style={buttonStyle}
        >
            {
                isLoading ?
                    <ActivityIndicator
                        animating
                        color={COLOR_CONSTANTS.BXR_SECONDARY}
                        size='large'
                        style={styles.loader}
                    /> :
                    buttonText
            }
        </Button>
    );
});
