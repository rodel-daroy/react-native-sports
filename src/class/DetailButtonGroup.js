/* @flow */


import COLOR_CONSTANTS from '../colorConstants'
import MediumText from '../common/text/SmallText'
import {
    ActivityIndicator,
    Button,
    createComponent,
    StyleSheet,
} from '../RNFReact'
import {
    BOOKED,
    CANCELED,
    CLOSED,
    OPEN,
    WAITLISTAVAILABLE,
    WAITLISTED
} from '../common/booking/bookingStatusConstants'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    button: {
        borderRadius: 0,
    },
    joinSessionText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
    },
    arrowIcon: {
        marginTop: 2,
        marginRight: 10,
    },
    loader: {
        position: 'relative',
        width: 50,
        marginRight: 5,
    },
    text: {
        color: 'rgb(0,0,0)',
    },
    disabledButton: {
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
})

const OPEN_SESSION_TEXT = 'JOIN THIS SESSION'
const BOOK_SESSION_TEXT = 'YOU HAVE BOOKED THIS SESSION'
const CANCELLED_SESSION_TEXT = 'THIS CLASS IS CANCELLED'
const CLOSED_SESSION_TEXT = 'THIS CLASS IS CLOSED FOR BOOKING'
const BOOKING_NOT_AVAILABLE = 'BOOKING NOT YET AVAILABLE'

const propTypes = {
    bookingStatus: PropTypes.string,
    isBooking: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onJoinSession: PropTypes.func,
    onReturn: PropTypes.func,
    onUnBookSession: PropTypes.func,
}

const buttonText = {
    [BOOKED]: BOOK_SESSION_TEXT,
    [OPEN]: OPEN_SESSION_TEXT,
    [CLOSED]: CLOSED_SESSION_TEXT,
    [CANCELED]: CANCELLED_SESSION_TEXT,
    [WAITLISTAVAILABLE]: 'JOIN WAITLIST',
    [WAITLISTED]: 'CANCEL WAITLIST'
}

const getButtonText = (isReadOnly, bookingStatus) => isReadOnly ? BOOKING_NOT_AVAILABLE : buttonText[bookingStatus]

export default createComponent({displayName: 'DetailButtonGroup', propTypes}, ({  // eslint-disable-line complexity
    bookingStatus,
    isLoading,
    isReadOnly,
    onJoinSession,
    onUnBookSession,
    onJoinWaitlist,
    onWaitlisted
}) => {
    const bookingFunctions = {
        [BOOKED]: onUnBookSession,
        [OPEN]: onJoinSession,
        [CLOSED]: () => null,
        [CANCELED]: () => null,
        [WAITLISTAVAILABLE]: onJoinWaitlist,
        [WAITLISTED]: onWaitlisted
    }

    const isDisabled = bookingStatus === CLOSED || bookingStatus === CANCELED || isReadOnly
    if(bookingStatus === undefined) {
        return null;
    } else {
        return (
            <Button
                disabled={isDisabled}
                onPress={bookingFunctions[bookingStatus]} // eslint-disable-line react/jsx-handler-names
                style={[styles.button, isDisabled ? styles.disabledButton : {}]}
            >
                {isLoading ?
                    <ActivityIndicator
                        animating
                        color={COLOR_CONSTANTS.BXR_TEXT}
                        size='large'
                        style={styles.loader}
                    /> :
                    <MediumText style={styles.joinSessionText}>
                        {getButtonText(isReadOnly, bookingStatus)}
                    </MediumText>
                }
            </Button>
        )
    }
})
