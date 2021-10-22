/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import COLOR_CONSTANTS from '../colorConstants'
import MediumText from '../common/text/MediumText'
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, VerticalLayout} from '../RNFReact'

const styles = StyleSheet.create({
    textContainer: {
        padding: 20,
    },
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        textAlign: 'center',
        paddingTop: 20,
    },
})

const SliderContent = ({
    textContent,
    children,
    backgroundIndex,
}) => (
    <BackgroundImageContainer backgroundIndex={backgroundIndex}>
        <VerticalLayout
            verticalAlign
            weight={1}
        >
            <VerticalLayout
                horizontalAlign
                style={styles.textContainer}
                verticalAlign
            >
                {children || <MediumText style={styles.text}>{textContent}</MediumText>}

            </VerticalLayout>
        </VerticalLayout>
    </BackgroundImageContainer>
)

SliderContent.propTypes = {
    backgroundIndex: PropTypes.number,
    children: PropTypes.node,
    textContent: PropTypes.string,
}

export default SliderContent
