/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import ExtraSmallText from '../common/text/ExtraSmallText'
import React from 'react'
import {
    ActivityIndicator,
    createComponent,
    Icon,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../RNFReact'
import {
    BOOKED,
    CANCELED,
} from '../common/booking/bookingStatusConstants'

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
})

const CLOSED_TAG_TEXT = 'CLOSED'
const CANCELLED_TAG_TEXT = 'CANCELED'

const getStatusText = (bookingStatus) => bookingStatus === CANCELED ? CANCELLED_TAG_TEXT : CLOSED_TAG_TEXT

export default createComponent({displayName: 'CancelButton'}, ({
    bookingStatus,
    isLoading,
    onUnBookItem,
}) => {
    if (isLoading) {
        return (
            <ActivityIndicator
                animating
                color={COLOR_CONSTANTS.BXR_PRIMARY}
                size='large'
                style={styles.loader}
            />
        )
    }

    return bookingStatus === BOOKED ?
        <Touchable onPress={onUnBookItem}>
            <Icon
                color={COLOR_CONSTANTS.BXR_TEXT_SECONDARY}
                iconSet='Ionicons'
                name={'ios-remove-circle-outline'}
                size={35}
                style={styles.icon}
            />
        </Touchable> :
        <VerticalLayout
            horizontalAlign
            verticalAlign
            weight={1}
        >
            <ExtraSmallText style={styles.tag}>
                {getStatusText(bookingStatus)}
            </ExtraSmallText>
        </VerticalLayout>
})
