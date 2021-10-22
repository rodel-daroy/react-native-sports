/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import ListContent from '../ListContent'
import {
    ActivityIndicator,
    createComponent,
    StyleSheet,
    VerticalLayout,
} from '../../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})

const BOOKING_LIST_EMPTY_LIST_MESSAGE = 'No classes available at the moment. Please try again later.'
const BOOKING_LIST_FAILED_MESSAGE = 'We were unable to display the classes at this time. Please check your connection and try again.'// eslint-disable-line max-len

const propTypes = {
    bookingList: immutablePropTypes.contains(
        immutablePropTypes.map.isRequired,
    ),
    emptyListMessage: PropTypes.string,
    failedFetchMessage: PropTypes.string,
    isGettingList: PropTypes.bool,
    isCurrentWeek: PropTypes.bool,
    onBookItem: PropTypes.func,
    onRefreshList: PropTypes.func,
    onItemSelected: PropTypes.func,
    onUnBookItem: PropTypes.func,
    renderRow: PropTypes.func,
}

export default createComponent({displayName: 'BookingList', propTypes}, ({
    bookingList,
    emptyListMessage = BOOKING_LIST_EMPTY_LIST_MESSAGE,
    failedFetchMessage = BOOKING_LIST_FAILED_MESSAGE,
    fetchSuccess,
    isGettingList,
    onRefreshList,
    renderRow,
}) => {
    if (isGettingList) {
        return (
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
            </VerticalLayout>
        )
    }

    return (
        <ListContent
            emptyListMessage={emptyListMessage}
            failedFetchMessage={failedFetchMessage}
            fetchSuccess={fetchSuccess}
            listData={bookingList}
            onRefreshList={onRefreshList}
            renderRow={renderRow}
        />
    )
})
