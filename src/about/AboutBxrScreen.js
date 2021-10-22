/* @flow */

// import AppIntro from 'react-native-app-intro'
import AppIntroSlider from 'react-native-app-intro-slider'
import COLOR_CONSTANTS from '../colorConstants'
import React, {Component} from 'react';
import {
    createComponent,
    StyleSheet, VerticalLayout,
    View,
} from '../RNFReact'
import MediumText from "../common/text/MediumText";
import SmallText from "../common/text/SmallText";
import BackgroundImageContainer from "../common/BackgroundImageContainer";
import {Linking, Platform} from "react-native";

const styles = StyleSheet.create({
    slideContent: {
        flex: 1,
    },
    tab: {
        flex: 1,
        backgroundColor: 'red',
        marginTop: -100,
    },
    textContainer: {
        padding: 20,
        paddingTop: 40,
    },
    boldText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 30,
    },
})

function phoneCall(phoneNumber) {
    const url = `${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${phoneNumber}`;
    Linking.openURL(url);
}

function openMail(mailAddress) {
    const url = `mailto:${mailAddress}`;
    Linking.openURL(url);
}

export default createComponent({
    displayName: 'AboutBxrScreen',
}, class TrainerConfirmScreen extends Component {

    constructor() {
        super();
        this.state = {
            slides: [0, 1, 2]
        }
    }

    renderItem({index}) {
        if(index === 0) {
            return (
                <View style={styles.slideContent} key={index}>
                    <BackgroundImageContainer backgroundIndex={3}>
                        <VerticalLayout
                            verticalAlign
                            horizontalAlign
                            weight={1}
                        >
                            <VerticalLayout
                                horizontalAlign
                                style={styles.textContainer}
                                verticalAlign
                            >
                                <SmallText style={styles.text}>
                                    Welcome to BXR London, the first high-end boxing gym in the world. With boxing at its core, BXR offers a wide array of disciplines,
                                    including kickboxing, Muay Thai, strength & conditioning, circuit training and physio rehab appointments.
                                </SmallText>
                                <SmallText style={styles.text}>
                                    Combat sessions are 60 minute one-on-one sessions, focused on technique and skills. S&C training sessions are results-driven 60 minute
                                    one-on-one sessions, focused on improving performance and aesthetics.
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 1) {
            return (
                <View style={styles.slideContent} key={index}>
                    <BackgroundImageContainer backgroundIndex={4}>
                        <VerticalLayout
                            verticalAlign
                            horizontalAlign
                            weight={1}
                        >
                            <VerticalLayout
                                horizontalAlign
                                style={styles.textContainer}
                                verticalAlign
                            >
                                <SmallText style={styles.text}>
                                    One-on-one training is available to purchase as single sessions or packs:
                                </SmallText>
                                <SmallText style={styles.boldText}>Tier 1</SmallText>
                                <SmallText style={styles.text}>
                                    Heavyweight 24 x sessions: £2160 {'\n'}
                                    Middleweight 12 x sessions: £1160 {'\n'}
                                    Single session: £105
                                </SmallText>

                                <SmallText style={styles.boldText}>Tier 2</SmallText>
                                <SmallText style={styles.text}>
                                    Heavyweight 24 x sessions: £1800 {'\n'}
                                    Middleweight 12 x sessions: £930 {'\n'}
                                    Single session: £85
                                </SmallText>

                                <SmallText style={styles.text}>
                                    For appointments please email {'\n'}
                                    <SmallText style={[styles.boldText, {color: '#1e88e5'}]} onPress={() => openMail('membership@bxrlondon.com')}>membership@bxrlondon.com</SmallText> or call {'\n'}
                                    <SmallText style={[styles.boldText, {color: '#1e88e5'}]} onPress={() => phoneCall('02031463436')}>02031463436</SmallText>
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 2) {
            return (
                <View style={styles.slideContent} key={index}>
                    <BackgroundImageContainer backgroundIndex={17}>
                        <VerticalLayout
                            verticalAlign
                            horizontalAlign
                            weight={1}
                        >
                            <VerticalLayout
                                horizontalAlign
                                style={styles.textContainer}
                                verticalAlign
                            >
                                <SmallText style={styles.text}>
                                    I hated every minute of training, but I said:{'\n'}
                                    "Don't quit, suffer now and live the rest of your life as a champion".
                                </SmallText>
                                <SmallText style={styles.boldText}>
                                    - Muhammad Ali
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        }else {
            return null;
        }
    }

    render() {
        const {isTab} = this.props;
        return (
            <View style={{flex: 1}}>
                <AppIntroSlider
                    renderItem={this.renderItem.bind(this)}
                    slides={this.state.slides}
                    showNextButton={false}
                    showDoneButton={false}
                    dotStyle={{backgroundColor: COLOR_CONSTANTS.BXR_TEXT}}
                    activeDotStyle={{backgroundColor: COLOR_CONSTANTS.BXR_PRIMARY}}
                />
            </View>
        )
    }
});
