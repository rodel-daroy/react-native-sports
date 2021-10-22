/* @flow */

import CancelButton from './CancelButton'
import COLOR_CONSTANTS from '../colorConstants'
import ExtraSmallText from '../common/text/ExtraSmallText'
import HeaderText from '../common/text/HeaderText'
import SmallText from '../common/text/SmallText'
import {
    CANCELED,
    CLOSED,
} from '../common/booking/bookingStatusConstants'
import {
    createComponent,
    HorizontalLayout,
    Platform,
    Row,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import {getMonthAndDay, getTime} from '../timeAndDateUtil'
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
    },
    venue: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    staffName: {
        color: 'rgb(169, 169, 169)',
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
        width: 70,
        alignItems: 'flex-end',
    },
    dateAndTimeContainer: {
        justifyContent: 'flex-start',
        paddingTop: 2,
    },
    closed: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    row: {
        margin: 0,
        padding: 0,
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
    isLoading,
    onUnBookItem,
    onItemSelected,
}) => (
    <Row
        onPress={onItemSelected}
        style={styles.row}
    >
        <HorizontalLayout style={styles.rowItem}>
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
                <HeaderText style={[styles.name, getBookingStatusStyle(bookingStatus)]}>{name}</HeaderText>
                <SmallText style={styles.venue}>{venue.toUpperCase()}</SmallText>
                <ExtraSmallText style={styles.staffName}>{staffName.toUpperCase()}</ExtraSmallText>
            </VerticalLayout>
            <VerticalLayout
                style={styles.iconContainer}
                verticalAlign
            >
                <CancelButton
                    bookingStatus={bookingStatus}
                    isLoading={isLoading}
                    onUnBookItem={onUnBookItem}
                />
            </VerticalLayout>
        </HorizontalLayout>
    </Row>
 ))
