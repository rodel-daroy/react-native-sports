/* @flow */

import BookingButton from './BookingButton'
import COLOR_CONSTANTS from '../../colorConstants'
import ExtraSmallText from '../text/ExtraSmallText'
import HeaderText from '../text/HeaderText'
import SmallText from '../text/SmallText'
import {
    CANCELED,
    CLOSED,
    WAITLISTAVAILABLE,
    WAITLISTED,
} from './bookingStatusConstants'
import {
    createComponent,
    HorizontalLayout,
    Platform,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../../RNFReact'
import {getMonthAndDay, getTime} from '../../timeAndDateUtil'
import React from 'react';
import PropTypes from 'prop-types';

const resetBorder = null
const styles = StyleSheet.create({
    rowItem: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        ...resetBorder,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(210, 210, 210)',
        flex: 1,
        width: null,
        height: 122,
        alignItems: 'center',
    },
    venue: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    staffName: {
        color: 'rgb(169, 169, 169)',
    },
    waitListText: {
        color: 'rgb(255, 57, 0)',
    },
    rowDetails: {
        marginLeft: 10,
        justifyContent: 'flex-start',
    },
    date: {
        color: COLOR_CONSTANTS.BXR_SECONDARY,
        fontWeight: 'bold',
    },
    time: {
        color: 'rgb(180, 180, 180)',
    },
    iconContainer: {
        marginHorizontal: 10,
        alignItems: 'flex-end',
    },
    dateAndTimeContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 2,
    },
    closed: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    tag: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        textAlign: 'center',
    },
    tagContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})

export const classItemPropTypes = {
    name: PropTypes.string,
    staffName: PropTypes.string,
    dateAndTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    venue: PropTypes.string,
    onBookItem: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRemoveItem: PropTypes.func,
    isEnrolled: PropTypes.string,
}

const propTypes = {
    ...classItemPropTypes,
    onBookItem: PropTypes.func,
    onItemSelected: PropTypes.func,
}

const getBookingStatusStyle = (bookingStatus) => bookingStatus === CLOSED || bookingStatus === CANCELED ? styles.closed : {} // eslint-disable-line max-len

export default createComponent({displayName: 'BookingRow', propTypes}, ({
    bookingStatus,
    name = '',
    startDateTime,
    venue = '',
    staffName = '',
    isReadOnly,
    isLoading,
    onBookItem,
    onJoinWaitlist,
    onWaitlisted,
    onUnBookItem,
    onItemSelected,
    isWaitlistAvailable
}) => (
    <HorizontalLayout
        style={styles.rowItem}
        weight={1}
    >
        <VerticalLayout style={styles.dateAndTimeContainer}>
            <ExtraSmallText style={[styles.date, getBookingStatusStyle(bookingStatus)]}>
                {getMonthAndDay(startDateTime).toUpperCase()}
            </ExtraSmallText>
            <ExtraSmallText style={styles.time}>{getTime(startDateTime)}</ExtraSmallText>
        </VerticalLayout>
        <VerticalLayout
            style={styles.rowDetails}
            verticalAlign
            weight={1}
        >
            <Touchable onPress={onItemSelected}>
                <HeaderText
                    numberOfLines={2}
                    style={[styles.name, getBookingStatusStyle(bookingStatus)]}
                >
                    {name}
                </HeaderText>
            </Touchable>
            <SmallText style={styles.venue}>{venue.toUpperCase()}</SmallText>
            <ExtraSmallText style={styles.staffName}>{staffName.toUpperCase()}</ExtraSmallText>
            {
                bookingStatus === WAITLISTAVAILABLE || bookingStatus === WAITLISTED ?
                    <ExtraSmallText style={styles.waitListText}>Class full join the waitlist</ExtraSmallText>
                    : null
            }
        </VerticalLayout>

        <VerticalLayout
            style={styles.iconContainer}
            verticalAlign
        >
            <BookingButton
                bookingStatus={bookingStatus}
                isLoading={isLoading}
                isReadOnly={isReadOnly}
                onBookItem={onBookItem}
                onJoinWaitlist={onJoinWaitlist}
                onWaitlisted={onWaitlisted}
                onUnBookItem={onUnBookItem}

            />
        </VerticalLayout>
    </HorizontalLayout>
 ))
