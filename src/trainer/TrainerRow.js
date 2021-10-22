/* @flow */

import Avatar from '../common/Avatar'
import BuyButton from '../common/booking/BuyButton'
import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import {OPEN} from '../common/booking/bookingStatusConstants'
import SmallText from '../common/text/SmallText'
import {
    createComponent,
    Platform,
    Row,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const resetBorder = null

const styles = StyleSheet.create({
    name: {
        color: COLOR_CONSTANTS.BXR_SECONDARY,
    },
    rowItem: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        ...resetBorder,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(210, 210, 210)',
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
        flex: 1,
        height: 100,
        width: null,
    },
    avatarContainer: {
        justifyContent: 'flex-start',
        paddingTop: 2,
        marginLeft: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 2,
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    program: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    rowDetails: {
        marginLeft: 10,
        justifyContent: 'flex-start',
    },
})

const propTypes = {
    onBookTrainer: PropTypes.func,
    programName: PropTypes.string,
    staffName: PropTypes.string,
    onViewTrainer: PropTypes.func,
    readOnlyMode: PropTypes.bool,
}

export default createComponent({
    displayName: 'TrainerRow',
    propTypes,
}, ({
    avatarUrl,
    programName = '',
    staffName = '',
    onBookTrainer,
    onViewTrainer,
    readOnlyMode,
    buttonText,
}) => (
    <Row
        onPress={onViewTrainer}
        style={styles.rowItem}
    >
        <VerticalLayout style={styles.avatarContainer}>
            <Avatar
                avatarUrl={avatarUrl}
                style={styles.avatar}
            />
        </VerticalLayout>
        <VerticalLayout
            style={styles.rowDetails}
            verticalAlign
            weight={1}
        >
            <HeaderText
                numberOfLines={1}
                style={styles.name}
            >
                {staffName.toUpperCase()}
            </HeaderText>
            <SmallText style={styles.program}>{programName}</SmallText>
        </VerticalLayout>
        {
            readOnlyMode ? null :
            <VerticalLayout
                style={styles.iconContainer}
                verticalAlign
            >
                <BuyButton
                    bookingStatus={OPEN}
                    isLoading={false}
                    isReadOnly={false}
                    onBookItem={onBookTrainer}
                    buttonText={buttonText}
                />
            </VerticalLayout>
        }
    </Row>
))
