/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import ExtraSmallText from '../text/ExtraSmallText'
import React from 'react'
import SmallText from '../text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    Icon,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../../RNFReact'
import {
    BOOKED,
    CANCELED,
    OPEN,
} from './bookingStatusConstants'

const styles = StyleSheet.create({
    loader: {
        position: 'relative',
        width: 50,
        marginRight: 5,
    },
    icon: {
        width: 55,
    },
    tag: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        textAlign: 'center',
    },
    book: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        fontWeight: 'bold',
    },
})

export const ActionButton = createComponent({displayName: 'ActionButton'}, ({
    onBookItem,
    onUnBookItem,
    isBooked,
    buttonText,
}) => (
    <Touchable onPress={isBooked ? onUnBookItem : onBookItem}>
        {
            isBooked ?
                <Icon
                    iconSet='Ionicons'
                    name={'ios-checkmark-circle'}
                    size={35}
                    style={styles.icon}
                /> :
                <SmallText style={styles.book}>{buttonText}</SmallText>
        }
    </Touchable>
))

const CLOSED_TAG_TEXT = 'CLOSED FOR BOOKING'
const CANCELLED_TAG_TEXT = 'CANCELED'
const BOOKING_NOT_AVAILABLE = 'BOOKING NOT YET AVAILABLE'

const getStatusText = (isViewOnly, bookingStatus) => {
    if (isViewOnly) {
        return BOOKING_NOT_AVAILABLE
    }

    return bookingStatus === CANCELED ? CANCELLED_TAG_TEXT : CLOSED_TAG_TEXT
}

const renderBookingTag = (bookingStatus, onBookItem, onUnBookItem, isReadOnly, buttonText) => {
    const isOpen = bookingStatus === OPEN
    const isBooked = bookingStatus === BOOKED

    return (
        !isReadOnly && (isOpen || isBooked) ?
            <ActionButton
                isBooked={isBooked}
                onBookItem={onBookItem}
                onUnBookItem={onUnBookItem}
                buttonText={buttonText}
            /> :
            <VerticalLayout
                horizontalAlign
                verticalAlign
                weight={1}
            >
                <ExtraSmallText style={styles.tag}>
                    {getStatusText(isReadOnly, bookingStatus)}
                </ExtraSmallText>
            </VerticalLayout>
    )
}

export default createComponent({displayName: 'BookingButton'}, ({
    bookingStatus,
    isLoading,
    isReadOnly,
    onBookItem,
    onUnBookItem,
    buttonText,
}) => (
    isLoading ?
        <ActivityIndicator
            animating
            color={COLOR_CONSTANTS.BXR_PRIMARY}
            size='large'
            style={styles.loader}
        /> :
        renderBookingTag(bookingStatus, onBookItem, onUnBookItem, isReadOnly, buttonText)
))
