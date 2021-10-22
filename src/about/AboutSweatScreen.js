/* @flow */

// import AppIntro from 'react-native-app-intro'
import AppIntroSlider from 'react-native-app-intro-slider'
import COLOR_CONSTANTS from '../colorConstants'
import React, {Component} from 'react';
import {
    createComponent,
    StyleSheet,
    VerticalLayout,
    View,
    HorizontalLayout,
} from '../RNFReact'
import MediumText from "../common/text/MediumText";
import SmallText from "../common/text/SmallText";
import BackgroundImageContainer from "../common/BackgroundImageContainer";

const styles = StyleSheet.create({
    slideContent: {
        flex: 1,
    },
    tab: {
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
    priceContainer: {
        width: 300,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 3,
        borderTopWidth: 1,
        borderColor: COLOR_CONSTANTS.BXR_TEXT,
    },
    priceText: {
        fontSize: 18,
    },
});

export default createComponent({
    displayName: 'AboutBxrScreen',
}, class TrainerConfirmScreen extends Component {

    constructor() {
        super();
        this.state = {
            slides: [0, 1, 2, 3, 4, 5]
        }
    }

    renderItem({index}) {
        if (index === 0) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={11}>
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
                                    SWEAT by BXR is a one-stop-shop for boutique pay-to-train fitness, featuring three concept studios specialising in four specific areas:
                                </SmallText>
                                <SmallText style={styles.boldText}>
                                    Boxing Skills{'\n'}
                                    Cardio{'\n'}
                                    Strength & Conditioning{'\n'}
                                    Mobility
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 1) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={12}>
                        <VerticalLayout
                            verticalAlign
                            horizontalAlign
                            weight={1}
                        >
                            <VerticalLayout
                                horizontalAlign
                                style={{...styles.textContainer, paddingTop: 0, paddingBottom: 60}}
                                verticalAlign
                            >
                                <SmallText style={[styles.boldText, {paddingBottom: 7}]}>SWEAT Packs</SmallText>
                                <SmallText style={[styles.text, {paddingBottom: 20}]}>
                                    SWEAT Class £30{'\n'}
                                    (£15 for members)
                                </SmallText>
                                <HorizontalLayout style={styles.priceContainer}>
                                    <SmallText style={styles.priceText}>Pack of 4</SmallText>
                                    <SmallText style={styles.priceText}>£90</SmallText>
                                </HorizontalLayout>
                                <HorizontalLayout style={styles.priceContainer}>
                                    <SmallText style={styles.priceText}>Pack of 8</SmallText>
                                    <SmallText style={styles.priceText}>£170</SmallText>
                                </HorizontalLayout>
                                <HorizontalLayout style={styles.priceContainer}>
                                    <SmallText style={styles.priceText}>Pack of 12</SmallText>
                                    <SmallText style={styles.priceText}>£240</SmallText>
                                </HorizontalLayout>
                                <HorizontalLayout style={styles.priceContainer}>
                                    <SmallText style={styles.priceText}>Pack of 25</SmallText>
                                    <SmallText style={styles.priceText}>£425</SmallText>
                                </HorizontalLayout>
                                <HorizontalLayout style={[styles.priceContainer, {borderBottomWidth: 1}]}>
                                    <SmallText style={styles.priceText}>Pack of 50</SmallText>
                                    <SmallText style={styles.priceText}>£750</SmallText>
                                </HorizontalLayout>
                                <SmallText style={[styles.boldText, {paddingTop: 30, paddingBottom: 7}]}>SWEAT Memberships</SmallText>
                                <SmallText style={[styles.text, {paddingBottom: 15}]}>30 classes per month £180{'\n'}(£6.00 per class)</SmallText>
                                <SmallText style={[styles.text, {paddingBottom: 0}]}>Unlimited classes per month £300{'\n'}(£5.00 per class)</SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 2) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={13}>
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
                                    Designed by "Fighters" - Experience high intensity rounds of boxing, bodyweight exercises & ab/core drills paired with high-energy music.
                                </SmallText>
                                <SmallText style={styles.text}>
                                    These classes focus on the essential elements of boxing technique and allow
                                    you to learn and hone your 'Skills' with a variety of drills on individual boxing bags.
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 3) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={14}>
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
                                    Europe's first climb-focused group training concept, utilizing cutting-edge technology from VersaClimber.
                                </SmallText>
                                <SmallText style={styles.text}>
                                    Our signature 'ClimbToTheBeat!' class provides an introduction to the VersaClimber and its ability to provide a safe,
                                    full-bodyworkout. Fast paced and fun, this cardio class merges exercise with music and it tailored to keep you moving.
                                </SmallText>
                                <SmallText style={styles.text}>
                                    Build using interval training and focusing onn a variety of motions to effectively train you as you learn the foundations of Versa Climbing.
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 4) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={15}>
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
                                    With 4 class formats available, focusing on the main areas and elements of Strength & Conditioning,
                                    classes are specifically timetabled throughout the week to allow for appropriate rest and recovery between sessions.
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
        } else if(index === 5) {
            return (
                <View style={styles.slideContent}>
                    <BackgroundImageContainer backgroundIndex={16}>
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
                                    Offering a range of classes to aid you with your training needs, from functional mobility & stretch classes to more
                                    mindful, health & wellbeing practices.
                                </SmallText>
                            </VerticalLayout>
                        </VerticalLayout>
                    </BackgroundImageContainer>
                </View>
            )
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
