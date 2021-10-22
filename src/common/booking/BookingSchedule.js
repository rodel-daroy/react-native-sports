/* @flow */

import BookingButton from './BookingButton'
import calculateTimetable from './calculateTimetable'
import COLOR_CONSTANTS from '../../colorConstants'
import HeaderText from '../text/HeaderText'
import moment from 'moment'
import {OPEN} from './bookingStatusConstants'
import R from 'ramda'
import React from 'react'
import SmallText from '../text/SmallText'
import TimeTable from './TimeTable'
import {
    createComponent,
    HorizontalLayout,
    Scrollable,
    StyleSheet,
    Touchable,
    VerticalLayout,
    View,
} from '../../RNFReact'

const styles = StyleSheet.create({
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        textAlign: 'center',
    },
    noAvailabilityText: {
        textAlign: 'center',
    },
    itemSchedule: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(210, 210, 210)',
    },
    bookingButtonTextContainer: {
        paddingHorizontal: 10,
    },
    bookingButtonCell: {
        height: 60,
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingRowText: {
        color: COLOR_CONSTANTS.BXR_SECONDARY,
    },
})

const noop = () => null

const minuteDifference = (startTime, endTime) => endTime.diff(startTime, 'minutes')

const getScheduleStyle = (startTime, endTime, notAvailable) => Object.freeze({
    backgroundColor: notAvailable ? COLOR_CONSTANTS.BXR_TEXT_SECONDARY : COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
})

const BookingButtons = createComponent({displayName: 'BookingButtons'}, ({
    startTime,
    endTime,
    onBookCurrentItem,
    sessionName,
}) => {
    const TIME_INTERVAL = 15
    const buttonRanges = R.range(0, (minuteDifference(startTime, endTime) / TIME_INTERVAL) + 1)

    return (
        <View>
            {buttonRanges.map((item, index) => {
                const bookCurrentItem = onBookCurrentItem ?
                    () => onBookCurrentItem(startTime.clone().add(index * TIME_INTERVAL, 'minutes')) : noop

                return (
                    <Touchable
                        key={item}
                        onPress={bookCurrentItem}
                        style={[styles.itemSchedule, styles.bookingButtonCell]}
                    >
                        <VerticalLayout
                            style={styles.bookingButtonTextContainer}
                            weight={1}
                        >
                            <HeaderText
                                numberOfLines={1}
                            >
                                {sessionName}
                            </HeaderText>
                            <SmallText style={styles.bookingRowText}>Book this slot</SmallText>
                        </VerticalLayout>
                        <BookingButton
                            bookingStatus={OPEN}
                            onBookItem={bookCurrentItem}
                        />
                    </Touchable>
                )
            })}
        </View>
    )
})

const ScheduleItem = createComponent({displayName: 'ScheduleItem'}, ({
    itemKey,
    itemName,
    isLoading,
    startTime,
    endTime,
    notAvailable,
    onBookCurrentItem,
}) => (
    <VerticalLayout
        key={itemKey}
        style={getScheduleStyle(startTime, endTime, notAvailable)}
    >
        <BookingButtons
            endTime={endTime}
            isLoading={isLoading}
            onBookCurrentItem={onBookCurrentItem}
            sessionName={itemName}
            startTime={startTime}
        />
    </VerticalLayout>
))

const AppointmentScheduleList = createComponent({displayName: 'AppointmentScheduleList'}, ({
    appointmentSchedule,
    onBookTrainer,
}) => (
    <VerticalLayout
        weight={1}
    >
        {appointmentSchedule.map((item, index) => (
            <ScheduleItem
                endTime={moment(item.get('bookableEndDateTime'))} // eslint-disable-line moment-utc/no-moment-without-utc
                itemName={item.getIn(['sessionType', 'name'])}
                key={index}
                notAvailable={item.get('notAvailable')}
                onBookCurrentItem={(startTime) => onBookTrainer(item, startTime)}
                startTime={moment(item.get('startDateTime'))} // eslint-disable-line moment-utc/no-moment-without-utc
            />
        ))}
    </VerticalLayout>
))

export default createComponent({displayName: 'BookingSchedule'}, ({
    currentTrainerSchedules,
    onBookTrainer,
}) => {
    if (currentTrainerSchedules.isEmpty()) {
        return (
            <VerticalLayout
                horizontalAlign
                verticalAlign
                weight={1}
            >
                <HeaderText
                    style={styles.noAvailabilityText}
                >
                    {'Unfortunately there\'s no availability for the selected period. Please try again later.'}
                </HeaderText>
            </VerticalLayout>
        )
    }

    const timeTable = calculateTimetable(currentTrainerSchedules)

    return (
        <Scrollable>
            <HorizontalLayout>
                <TimeTable
                    timeTable={timeTable}
                />
                <AppointmentScheduleList
                    appointmentSchedule={currentTrainerSchedules}
                    onBookTrainer={onBookTrainer}
                />
            </HorizontalLayout>
        </Scrollable>
    )
})
