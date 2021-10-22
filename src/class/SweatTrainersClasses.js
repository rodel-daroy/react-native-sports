/* @flow */

import BookingList from '../common/booking/BookingList'
import BookingRow from '../common/booking/BookingRow'
import COLOR_CONSTANTS from '../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import {sweatClassTrainerClassesEventHandler as mapDispatchToProps} from './eventHandlers'
import {sweatTrainersClassesScreenSelector as mapStateToProps} from './selectors'
import ScreenContainer from '../common/ScreenContainer'
import SweatRemainingBalance from './SweatRemainingBalance'
import WeekFilterCoverage from '../common/WeekFilterCoverage'
import {
    createComponent,
    StyleSheet,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    remainingServiceContainer: {
        backgroundColor: 'rgb(40,40,40)',
    },
    errorText: {
        fontWeight: 'bold',
        margin: 10,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
    },
})

export default createComponent({
    displayName: 'SweatTrainersClasses',
    mapStateToProps,
    mapDispatchToProps,
}, class ClassList extends Component {
    static propTypes = {
        classList: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        clientId: PropTypes.string,
        currentSweatTrainerId: PropTypes.string,
        getListSuccess: PropTypes.bool,
        isGettingList: PropTypes.bool,
        isGettingSweatBalance: PropTypes.bool,
        onBookSweatTrainerClassTapped: PropTypes.func,
        onDateCoverageChange: PropTypes.func,
        onUnBookButtonTapped: PropTypes.func,
        onViewDetailButtonTapped: PropTypes.func,
        sweatBalance: PropTypes.number,
        weeksFromNow: PropTypes.number,
    }
    componentDidMount() {
        const {
            currentSweatTrainerId,
            clientId,
            onDateCoverageChange,
        } = this.props

        onDateCoverageChange({clientId, staffId: currentSweatTrainerId, weeksFromNow: 0})
    }

    render() {
        const {
            classList,
            onBookSweatTrainerClassTapped,
            onViewDetailButtonTapped,
            onUnBookButtonTapped,
            onDateCoverageChange,
            weeksFromNow,
            getListSuccess,
            isGettingList,
            isGettingSweatBalance,
            clientId,
            sweatBalance,
            navigation,
        } = this.props


        return (
            <ScreenContainer style={styles.container}>
                <WeekFilterCoverage
                    disabled={isGettingList}
                    onDateCoverageChange={
                        (weeksFromNow) => onDateCoverageChange({
                            clientId,
                            weeksFromNow,
                        })
                    }
                    weeksFromNow={weeksFromNow}
                />
                <SweatRemainingBalance
                    isGettingSweatBalance={isGettingSweatBalance}
                    sweatBalance={sweatBalance}
                />
                <BookingList
                    bookingList={classList}
                    fetchSuccess={getListSuccess}
                    isGettingList={isGettingList}
                    onRefreshList={() => null}
                    renderRow={({item}) =>
                        <BookingRow
                            bookingStatus={item.get('bookingStatus')}
                            isLoading={item.get('isLoading')}
                            isReadOnly={weeksFromNow !== 0}
                            name={item.getIn(['classDescription', 'name'])}
                            onBookItem={() => onBookSweatTrainerClassTapped({clientId, item})}
                            onItemSelected={() => onViewDetailButtonTapped(item,navigation)}
                            onUnBookItem={() => onUnBookButtonTapped({clientId, item})}
                            staffName={item.getIn(['staff', 'name'])}
                            startDateTime={item.get('startDateTime')}
                            venue={item.getIn(['location', 'name'])}
                        />
                    }
                />
            </ScreenContainer>
        )
    }
})
