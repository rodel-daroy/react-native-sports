/* @flow */

import {AsyncStorage} from 'react-native'
import BxrLogoLarge from '../common/BxrLogoLarge'
import COLOR_CONSTANTS from '../colorConstants'
import React from 'react'
import SlideContent from './SlideContent'
import {USER_HAS_SEEN_APP_INTRO} from '../asyncStorageConstants'
import {
    createComponent,
    StyleSheet,
    View,
    Text,
    Touchable,
    Image,
} from '../RNFReact'
import {Dimensions} from 'react-native';
import MediumText from '../common/text/MediumText'
import SmallText from '../common/text/SmallText'
import {ifIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    slideContent: {
        flex: 1,
    },
    tab: {
        marginTop: -100,
    },
    textContainer: {
        // height: height - 160,
        justifyContent: 'center',
        marginBottom: 40,
        paddingTop: ifIphoneX(40, 5),
        paddingBottom: ifIphoneX(40, 10),
        paddingHorizontal: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',
    },
    logoImg: {
        width: ifIphoneX(90, 85),
        height: ifIphoneX(90, 85),
        alignSelf: 'center',
    },
    titleText1: {
        fontSize: ifIphoneX(25, 24),
        paddingHorizontal: 25,
        marginBottom: ifIphoneX(20, 17),
        // fontWeight: 'bold',
        textAlign: 'center'
    },
    titleText2: {
        textAlign: 'center',
        paddingHorizontal: 10,
        marginBottom: ifIphoneX(15, 12),
        fontSize: ifIphoneX(20, 19),
    },
    subTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        marginTop: 15,
        marginRight: 7,
        borderRadius: 2.5,
        backgroundColor: 'white'
    },

    descTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: ifIphoneX(15, 12),
    },
    descText: {
        fontSize: 14,
        paddingLeft: 15,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: ifIphoneX(40, 20),
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {

    },
    buttonText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: COLOR_CONSTANTS.BXR_PRIMARY,
    },
})

const SWIPE_INTRO_FIRST_SLIDE_TEXT = 'London’s first boutique boxing gym, launched in January 2017 in Marylebone, the capital’s centre for health and wellness.' // eslint-disable-line max-len
const SWIPE_INTRO_SECOND_SLIDE_TEXT = 'Dedicated to developing a championship mindset, we offer our members the standard of training, facilities and advice expected by professional athletes, regardless of level or ability.' // eslint-disable-line max-len
const SWIPE_INTRO_THIRD_SLIDE_TEXT = 'With boxing discipline at its core, BXR offers a wide array of combat disciplines, including kickboxing, Muay Thai, MMA and Brazilian Jiu Jitsu, as well as strength & conditioning and circuit training.' // eslint-disable-line max-len
const SWIPE_INTRO_FOURTH_SLIDE_TEXT =
 `I hated every minute of training, but I said, "Don't quit". Suffer now and live the rest of your life as a champion.

-Muhammad Ali`;


const onExitAppIntro = (navigation) => {
    AsyncStorage.setItem(USER_HAS_SEEN_APP_INTRO, 'true')
    navigation.navigate('Login');
}

export default createComponent({
    displayName: 'SwipeIntroScreen',
}, ({navigation}) => (
        <View style={styles.slideContent}>
            <SlideContent
                backgroundIndex={18}
            >
                <View style={styles.textContainer}>
                    <Image style={styles.logoImg} source={require('../images/bxrlogo.png')} />
                    <MediumText style={styles.titleText1}>
                        Welcome to the BXR & Sweat By BXR app
                    </MediumText>
                    <MediumText style={styles.titleText2}>
                        The fastest and easiest way to stay up to date & enjoy everything we have to offer
                    </MediumText>
                    <View>
                        <View style={styles.subTitleContainer}>
                            <View style={styles.dot} />
                            <MediumText style={styles.descTitleText}>Fast entry</MediumText>
                        </View>
                        <SmallText style={styles.descText}>Just scan your barcode on arrival</SmallText>
                        <View style={styles.subTitleContainer}>
                            <View style={styles.dot} />
                            <MediumText style={styles.descTitleText}>Personal Training Purchasing & Booking</MediumText>
                        </View>
                        <SmallText style={styles.descText}>You can now purchase your PT packs on the app - book, reserve and amend your appointments</SmallText>
                        <View style={styles.subTitleContainer}>
                            <View style={styles.dot} />
                            <MediumText style={styles.descTitleText}>Sweat by BXR Purchasing & Booking</MediumText>
                        </View>
                        <SmallText style={styles.descText}>You can now purchase packs on the app - reserve your places in Sweat classes up to 7 days in advance</SmallText>
                        <View style={styles.subTitleContainer}>
                            <View style={styles.dot} />
                            <MediumText style={styles.descTitleText}>BXR Member Classes</MediumText>
                        </View>
                        <SmallText style={styles.descText}>enjoy unlimited members classes - Now book in up to 7 days in advance</SmallText>
                    </View>
                </View>
            </SlideContent>
            <View style={styles.buttonContainer}>
                <Touchable style={styles.button} onPress={() => onExitAppIntro(navigation)}>
                    <Text style={styles.buttonText}>Done</Text>
                </Touchable>
            </View>
    </View>
))
