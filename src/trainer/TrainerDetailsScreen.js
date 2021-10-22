/* @flow */

import Avatar from '../common/Avatar'
import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import immutable from 'immutable'
import immutablePropTypes from 'react-immutable-proptypes'
import {trainerDetailsEventHandlers as mapDispatchToProps} from './eventHandlers'
import {trainerDetailsSelectors as mapStateToProps} from './selectors'
import ScreenContainer from '../common/ScreenContainer'
import SmallText from '../common/text/SmallText'
import {
    Button,
    createComponent,
    Scrollable,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'

import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    avatar: {
        marginBottom: 10,
    },
    bookNowButton: {
        borderRadius: 0,
    },
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    descriptionContainer: {
        paddingHorizontal: 30,
    },
    descriptionText: {
        color: COLOR_CONSTANTS.BXR_SECONDARY,
    },
    headerContainer: {
        padding: 20,
        marginVertical: 10,
    },
})

const propTypes = {
    avatarUrl: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    onBookTrainer: PropTypes.func,
    onUnbookTrainer: PropTypes.func,
    userDetails: immutablePropTypes.map,
    isBookable: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSweatTrainer: PropTypes.bool,
    isReadOnlyMode: PropTypes.bool,
    purchasedPackInfo: immutablePropTypes.map,
}

const ActionButton = createComponent({displayName: 'ActionButton'}, ({
    isBookable,
    isLoading,
    onBookTrainer,
    onUnbookTrainer,
    trainer,
    userDetails,
    purchasedPackInfo,
    navigation
}) => (
    isBookable ?
        <Button
            onPress={() => onBookTrainer({
                clientId: userDetails.get('iD'),
                trainer: immutable.Map({
                    staffID: trainer.getIn(['staff', 'iD']),
                    sessionID: trainer.getIn(['sessionType', 'iD']),
                    sessionName: trainer.getIn(['sessionType', 'name']),
                }),
                purchasedPackInfo,
            }, navigation)}
            style={styles.bookNowButton}
        >
            BOOK NOW
        </Button> :
        <Button
            onPress={() => onUnbookTrainer({
                appointmentId: trainer.get('appointmentID'),
                startTime: trainer.get('startDateTime'),
                popAfter: true,
            })}
            showIndicator={isLoading}
            style={styles.bookNowButton}
        >
            CANCEL THIS BOOKING
        </Button>
))

const noop = () => null

export default createComponent({
    displayName: 'TrainerDetails',
    mapStateToProps,
    mapDispatchToProps,
    propTypes,
}, ({
    avatarUrl,
    description,
    name,
    onBookTrainer,
    onBookTrainerWasTapped,
    onUnbookTrainer,
    onViewSweatClasses = noop,
    trainer,
    isReadOnlyMode,
    userDetails,
    isBookable,
    isLoading,
    purchasedPackInfo,
    navigation
}) => (
    <ScreenContainer>
        <VerticalLayout
            style={styles.container}
            weight={1}
        >
            <VerticalLayout
                horizontalAlign
                style={styles.headerContainer}
                verticalAlign
            >
                <Avatar
                    avatarUrl={avatarUrl}
                    style={styles.avatar}
                />
                <HeaderText>{name}</HeaderText>
            </VerticalLayout>
            <Scrollable
                style={styles.descriptionContainer}
                weight={1}
            >
                <SmallText style={styles.descriptionText}>
                    {description || 'Description not available.'}
                </SmallText>
            </Scrollable>
        </VerticalLayout>
        {
            isReadOnlyMode ?
                <Button
                    onPress={() => onViewSweatClasses(trainer.getIn(['staff', 'iD']), navigation)}
                    style={styles.bookNowButton}
                >
                View SWEAT Classes
            </Button> :
                <ActionButton
                    isBookable={isBookable}
                    isLoading={isLoading}
                    onBookTrainer={onBookTrainer}
                    onUnbookTrainer={onUnbookTrainer}
                    trainer={trainer}
                    userDetails={userDetails}
                    purchasedPackInfo={purchasedPackInfo}
                    navigation={navigation}
                />
        }
    </ScreenContainer>
))
