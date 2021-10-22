/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from './text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import RefreshButton from './form/SubmitButton'
import {
    createComponent,
    List,
    Platform,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const webScroll = null

const styles = StyleSheet.create({
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    list: {
        flex: 1,
        ...webScroll,
    },
    errorText: {
        fontWeight: 'bold',
        margin: 10,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
    },
})

const LIST_CONTENT_REFRESH_BUTTON_TEXT = 'refresh'

const propTypes = {
    emptyListMessage: PropTypes.string,
    failedFetchMessage: PropTypes.string,
    fetchSuccess: PropTypes.bool,
    listData: immutablePropTypes.contains(
        immutablePropTypes.map.isRequired,
    ),
    renderRow: PropTypes.func,
}

export default createComponent({displayName: 'ListContent', propTypes}, ({
    emptyListMessage,
    failedFetchMessage,
    fetchSuccess,
    listData,
    onRefreshList,
    renderRow,
}) => (
    listData && listData.count() > 0 ?
        <List
            enableEmptySections
            renderRow={renderRow}
            rowData={listData}
            shouldRenderSeparator={false}
            style={styles.list}
        /> :
        <VerticalLayout
            horizontalAlign
            verticalAlign
            weight={1}
        >
            <HeaderText style={styles.errorText}>
                {fetchSuccess ? emptyListMessage : failedFetchMessage}
            </HeaderText>
            <RefreshButton
                buttonText={LIST_CONTENT_REFRESH_BUTTON_TEXT}
                isFormComplete
                onPress={onRefreshList}
            />
        </VerticalLayout>
))
