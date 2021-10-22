/* @flow */

import Avatar from '../common/Avatar'
import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import {trainerSchedulesSelectors as mapStateToProps} from './selectors'
import R from 'ramda'
import ScreenContainer from '../common/ScreenContainer'
import MediumText from '../common/text/MediumText'
import SmallText from '../common/text/SmallText'
import TrainerPriceButton from './TrainerPriceButton';
import {
    ActivityIndicator,
    createComponent,
    HorizontalLayout,
    StyleSheet,
    Scrollable,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from './eventHandlers'
import immutable from 'immutable'
import ActionButton from "./ActionButton";
import {userDetails} from "../user/userSelector";
import OpenMap from 'react-native-open-maps';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
    },
    header: {
        backgroundColor: 'rgb(0, 0, 0)',
        padding: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 2,
        marginHorizontal: 20,
    },
    dateHeaderContainer: {
    },
    dateText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        padding: 10,
    },
    contentContainer: {
        justifyContent: 'space-between',
        paddingTop: 70,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    mainText: {
        textAlign: 'center',
        color: '#333333',
        fontWeight: 'bold',
    },
    descText: {
        color: '#333333',
    },
})



const formatPrice = (price) => R.isNil(price) ? '' : `£${price}`

export default createComponent({
    displayName: 'BookingConfirmScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class TrainerConfirmScreen extends Component {

    static propTypes = {
        currentDate: PropTypes.string,
        currentTrainer: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        currentSessionTypeId: PropTypes.string,
        onBookTrainerSchedule: PropTypes.func,
        isLoadingPrice: PropTypes.bool,
        availablePrograms: immutablePropTypes.list,
        onSelectTierPrice: PropTypes.func,
        selectedTierPrice: immutablePropTypes.map,
        isGettingPriceItems: PropTypes.bool,
        programFilter: PropTypes.string,
        tierFilter: PropTypes.string,
        userDetails: immutablePropTypes.map,
        bookedTrainerSchedule: immutablePropTypes.map,
        isBookingProceed: PropTypes.bool,
        onBookingProceed: PropTypes.func,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickAddress(){
        OpenMap({query: 'bxr', provider: 'google'});
    }

    render() {
        const {
            currentTrainerScheduleDetails,
            currentDate,
            isLoadingPrice,
            selectedTierPrice,
            onPayNowTapped,
            isGettingPriceItems,
            userDetails,
            bookedTrainerSchedule,
            isBookingProceed,
            onBookingProceed,
            navigation,
        } = this.props;

        return (
            <ScreenContainer style={styles.container}>
                <HorizontalLayout
                    style={styles.header}
                    verticalAlign
                >
                    <HorizontalLayout verticalAlign>
                        <Avatar
                            avatarUrl={currentTrainerScheduleDetails.getIn(['staff', 'imageURL'])}
                            style={styles.avatar}
                        />
                    </HorizontalLayout>
                    <VerticalLayout
                        verticalAlign
                        weight={1}
                    >
                        <HeaderText>{currentTrainerScheduleDetails.getIn(['staff', 'name'], '')}</HeaderText>
                        <SmallText>{currentTrainerScheduleDetails.getIn(['sessionType', 'name'], '')}</SmallText>
                        {
                            isLoadingPrice ?
                                <ActivityIndicator
                                    animating
                                    size='small'
                                    style={styles.priceActivityIndicator}
                                /> :
                                <SmallText>{formatPrice(currentTrainerScheduleDetails.get('price'))}</SmallText>
                        }
                    </VerticalLayout>
                </HorizontalLayout>
                <HorizontalLayout
                    horizontalAlign
                    style={styles.dateHeaderContainer}
                    verticalAlign
                >
                    <SmallText style={styles.dateText}> {currentDate}</SmallText>
                </HorizontalLayout>

                <VerticalLayout
                    weight={1}
                    style={styles.contentContainer}
                >
                    <SmallText style={styles.mainText}>Are you sure you wish to continue to{"\n"} book this session?</SmallText>
                    <SmallText style={styles.descText}>
                        Terms & Conditions: We would like to point out that BXR has a 24 hour cancellation policy,
                        which we operate to ensure fair booking opportunities to all members.
                        Charged appointments cancelled without the required notice will be charged in full,
                        whilst complimentary appointments will be forfeited. Please arrive 5 minutes prior
                        to the start of your appointment via our entrance at {'\n'}
                        <SmallText style={[styles.descText, {color: '#1e88e5'}]} onPress={() => this.clickAddress()}>24 Paddington Street, London, W1U 5QY.</SmallText>
                    </SmallText>
                </VerticalLayout>

                <ActionButton
                    isEnable={true}
                    isLoading={isBookingProceed}
                    buttonText='PROCEED'
                    onPress={() => onBookingProceed(userDetails.get('iD'),
                        bookedTrainerSchedule.get('bookDateTime'),
                        bookedTrainerSchedule.getIn(['staff', 'iD'], ''),
                        bookedTrainerSchedule.getIn(['sessionType', 'iD'], ''), navigation)}
                />
            </ScreenContainer>
        );
    }
})

