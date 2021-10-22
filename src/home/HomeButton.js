/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import isSmallScreen from '../common/isSmallScreen'
import MediumText from '../common/text/MediumText'
import {
  createComponent,
  HorizontalLayout,
  Icon,
  Image,
  Platform,
  Row,
  StyleSheet,
} from 'RNFReact'
import React, {PropTypes} from 'react'

const styles = StyleSheet.create({
    container: {
        padding: 0,
        marginVertical: 4,
        justifyContent: 'flex-end',
    },
    text: {
        textAlign: 'center',
    },
    buttonImage: {
        height: isSmallScreen() ? 30 : 50,
        width: null,
        flex: 1,
        position: 'relative',
    },
    imageChildrenContainer: {
        backgroundColor: COLOR_CONSTANTS.BXR_IMAGE_OVERLAY,
        alignItems: 'center',
        borderColor: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        ...Platform.select({
            web: {
                borderWidth: '1px 0',
                borderStyle: 'solid',
            },
        }),
    },
    textContainer: {
        flex: 1,
    },
    rightIcon: {
        marginLeft: 5,
        color: COLOR_CONSTANTS.BXR_TEXT,
    },
    withPadding: {
        padding: 8,
    },
})

const propTypes = {
    buttonImageUrl: PropTypes.any,
    buttonText: PropTypes.string,
    onPress: PropTypes.func,
    isHidden: PropTypes.bool,
}

export default createComponent({displayName: 'HomeButton', propTypes}, ({
    buttonImageUrl,
    buttonText,
    onPress,
    isHidden,
}) => {
    if (isHidden) {
        return null
    }

    return (
        <Row
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={buttonImageUrl}
                style={styles.buttonImage}
            >
                <HorizontalLayout
                    horizontalAlign
                    style={styles.imageChildrenContainer}
                    weight={1}
                >
                    <HorizontalLayout
                        horizontalAlign
                        style={styles.textContainer}
                        weight={1}
                    >
                        <HorizontalLayout
                            style={styles.withPadding}
                            verticalAlign
                        >
                            <MediumText style={styles.text}>{buttonText}</MediumText>
                            <Icon
                                name='chevron-right'
                                size={20}
                                style={styles.rightIcon}
                            />
                        </HorizontalLayout>
                    </HorizontalLayout>
                </HorizontalLayout>
            </Image>
        </Row>
    )
})
