/* @flow */

import background1 from '../images/background.jpg'
import background2 from '../images/background2.jpg'
import background3 from '../images/background3.jpg'
import background4 from '../images/background4.jpg'
import background5 from '../images/background5.jpg'
import background6 from '../images/background6.jpg'
import background7 from '../images/background7.jpg'
import background8 from '../images/background8.jpg'
import background9 from '../images/background9.jpg'
import background10 from '../images/background10.jpg'
import background11 from '../images/background11.jpg'
import background12 from '../images/background_sweat1.jpg'
import background13 from '../images/background_sweat2.jpg'
import background14 from '../images/background_sweat3.jpg'
import background15 from '../images/background_sweat4.jpg'
import background16 from '../images/background_sweat5.jpg'
import background17 from '../images/background_sweat6.jpg'
import background18 from '../images/background_bxr3.jpg'
import background0 from '../images/background0.jpg'
import COLOR_CONSTANTS from '../colorConstants'
import React from 'react'
import ScreenContainer from './ScreenContainer'
import {
    createComponent,
    Image,
    Platform,
    StyleSheet, VerticalLayout,
} from '../RNFReact';
import {ImageBackground} from 'react-native';

const backgroundImages = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10,
    background11,
    background12,
    background13,
    background14,
    background15,
    background16,
    background17,
    background18,
    background0,
]

const styles = StyleSheet.create({
    background: {
        width: null,
        height: null,
        flex: 1,
    },
    childrenContainer: {
        backgroundColor: COLOR_CONSTANTS.BXR_IMAGE_OVERLAY,
    },
})

export default createComponent({displayName: 'BackgroundImageContainer'}, ({
    style,
    children,
    isModal,
    backgroundIndex = 0,
    modalHeaderTitle,
    withTabBar,
    childrenContainerStyle,
    navigation
}) => (
    <ImageBackground
        childrenContainerStyle={childrenContainerStyle}
        source={backgroundImages[backgroundIndex]}
        style={styles.background}
    >
        <ScreenContainer
            isModal={isModal}
            modalHeaderTitle={modalHeaderTitle}
            style={[styles.childrenContainer, style]}
            withTabBar={withTabBar}
            navigation={navigation}
        >
            {children}
        </ScreenContainer>
    </ImageBackground>
))
