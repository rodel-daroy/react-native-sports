/* @flow */

import BookingList from '../common/booking/BookingList'
import COLOR_CONSTANTS from '../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import {sweatTrainersEventHandler as mapDispatchToProps} from './eventHandlers'
import {sweatTrainersListSelectors as mapStateToProps} from './selectors'
import ScreenContainer from '../common/ScreenContainer'
import TrainerRow from '../trainer/TrainerRow'
import {
    createComponent,
    StyleSheet,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';

const EMPTY_LIST_MESSAGE = 'No trainers available at the moment. Please try again later.'
const FAILED_FETCH_MESSAGE = 'We were unable to display the trainers at this time. Please check your connection and try again.'// eslint-disable-line max-len

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
})

const propTypes = {
    getTrainersSucceeded: PropTypes.bool,
    isGettingTrainers: PropTypes.bool,
    onGetTrainers: PropTypes.func,
    onViewTrainerWasTapped: PropTypes.func,
    sweatTrainers: immutablePropTypes.contains(
        immutablePropTypes.map.isRequired,
    ),
}

export default createComponent({
    displayName: 'SweatTrainers',
    propTypes,
    mapStateToProps,
    mapDispatchToProps,
}, class ClassScreen extends Component {
    static propTypes = {
        getTrainersSucceeded: PropTypes.bool,
        isGettingTrainers: PropTypes.bool,
        onGetSweatTrainers: PropTypes.func,
        onViewTrainerWasTapped: PropTypes.func,
        sweatTrainers: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
    }

    componentDidMount() {
        this.props.onGetSweatTrainers()
    }

    render() {
        const {
            sweatTrainers,
            getTrainersSucceeded,
            onGetSweatTrainers,
            isGettingTrainers,
            onViewTrainerWasTapped,
            navigation
        } = this.props

        return (
            <ScreenContainer style={styles.container}>
                <BookingList
                    bookingList={sweatTrainers}
                    emptyListMessage={EMPTY_LIST_MESSAGE}
                    failedFetchMessage={FAILED_FETCH_MESSAGE}
                    fetchSuccess={getTrainersSucceeded}
                    isGettingList={isGettingTrainers}
                    onRefreshList={() => onGetSweatTrainers()}
                    renderRow={({item}) => (
                        <TrainerRow
                            avatarUrl={item.getIn(['staff', 'imageURL'])}
                            onViewTrainer={() => onViewTrainerWasTapped(item.getIn(['staff', 'iD']), navigation)}
                            programName={item.getIn(['classDescription', 'name'])}
                            readOnlyMode
                            staffName={item.getIn(['staff', 'name'])}
                        />
                    )}
                />
            </ScreenContainer>
        )
    }


})
