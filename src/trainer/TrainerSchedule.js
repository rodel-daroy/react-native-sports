/* @flow */

import Avatar from '../common/Avatar'
import BookingSchedule from '../common/booking/BookingSchedule'
import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import {trainerSchedulesSelectors as mapStateToProps} from './selectors'
import R from 'ramda'
import ScreenContainer from '../common/ScreenContainer'
import SmallText from '../common/text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    HorizontalLayout,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';
import * as mapDispatchToProps from './eventHandlers'

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
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
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
    },
    dateText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        padding: 10,
    },
    priceActivityIndicator: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})

const propTypes = {
    isTreatment: PropTypes.bool,
    currentDate: PropTypes.string,
    currentTrainer: immutablePropTypes.contains(
        immutablePropTypes.map.isRequired,
    ),
    currentSessionTypeId: PropTypes.string,
    onBookTrainerSchedule: PropTypes.func,
    isLoadingPrice: PropTypes.bool,
    purchasedPackInfo: immutablePropTypes.map,
}

const formatPrice = (price) => R.isNil(price) ? '' : `£${price}`

export default createComponent({
    displayName: 'TrainerSchedule',
    mapStateToProps,
    mapDispatchToProps,
    propTypes,
}, ({
    isTreatment,
    currentTrainerScheduleDetails,
    schedules,
    onBookTrainerSchedule,
    userDetails,
    currentDate,
    isBookingTrainer,
    isLoadingPrice,
    purchasedPackInfo,
    navigation,
}) => (
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
        {
                isBookingTrainer ?
                    <VerticalLayout
                        horizontalAlign
                        verticalAlign
                        weight={1}
                    >
                        <ActivityIndicator
                            animating
                            color={COLOR_CONSTANTS.BXR_PRIMARY}
                            size='large'
                            style={styles.loader}
                        />
                    </VerticalLayout> :
                    <BookingSchedule
                        currentTrainerSchedules={schedules}
                        onBookTrainer={
                        (currentTrainerItem, startTime) =>
                            onBookTrainerSchedule(currentTrainerItem, userDetails.get('iD'), startTime, purchasedPackInfo, isTreatment, navigation)
                    }
                    />
            }
    </ScreenContainer>
    ),
)
