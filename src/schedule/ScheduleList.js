/* @flow */

import BookingList from '../common/booking/BookingList'
import COLOR_CONSTANTS from '../colorConstants'
import {dimension} from '../common/isSmallScreen'
import immutablePropTypes from 'react-immutable-proptypes'
import ScheduleRow from './ScheduleRow'
import ScreenContainer from '../common/ScreenContainer'
import SlideFilter from '../common/SlideFilter'
import WeekFilterCoverage from '../common/WeekFilterCoverage'
import {
    Platform,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';

const webScroll = null

const styles = StyleSheet.create({
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT,
    },
    list: {
        flex: 1,
        ...webScroll,
    },
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    errorText: {
        fontWeight: 'bold',
        margin: 10,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
    },
})

const EMPTY_LIST_MESSAGE = 'Your schedule is empty on this day.'
const FAILED_FETCH_MESSAGE = 'We are unable to display your schedules at this time. Please check your connection and try again.'// eslint-disable-line max-len

export default class ClassList extends Component {
    static propTypes = {
        clientId: PropTypes.string,
        currentFilterIndex: PropTypes.number,
        filters: immutablePropTypes.list,
        getListSuccess: PropTypes.bool,
        isGettingList: PropTypes.bool,
        list: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        onDateCoverageChange: PropTypes.func,
        onDateFilterChange: PropTypes.func,
        onGetList: PropTypes.func,
        onUnBookButtonTapped: PropTypes.func,
        onViewDetailButtonTapped: PropTypes.func,
        weeksFromNow: PropTypes.number,
    }

    componentDidMount() {
        const {
            clientId,
            onGetList,
            currentFilterIndex,
            weeksFromNow,
        } = this.props

        onGetList({clientId, filterIndex: currentFilterIndex, weeksFromNow})
    }

    render() {
        const {
            clientId,
            currentFilterIndex,
            filters,
            getListSuccess,
            isGettingList,
            list,
            onDateCoverageChange,
            onDateFilterChange,
            onGetList,
            onUnBookButtonTapped,
            onViewDetailButtonTapped,
            weeksFromNow,
            navigation
        } = this.props

        return (
            <ScreenContainer style={styles.container}>
                <VerticalLayout
                    verticalAlign
                    weight={1}
                >
                    <WeekFilterCoverage
                        disabled={isGettingList}
                        onDateCoverageChange={(weeksFromNow) => onDateCoverageChange({clientId, weeksFromNow})}
                        weeksFromNow={weeksFromNow}
                    />
                    <SlideFilter
                        currentFilterIndex={currentFilterIndex}
                        disabled={isGettingList}
                        filterItemStyle={{
                            minWidth: dimension.width / filters.count(),
                        }}
                        filters={filters}
                        onCurrentFilterIndexChange={
                            (filterIndex) => onDateFilterChange({clientId, filterIndex, weeksFromNow})
                        }
                    />
                    <BookingList
                        bookingList={list}
                        emptyListMessage={EMPTY_LIST_MESSAGE}
                        failedFetchMessage={FAILED_FETCH_MESSAGE}
                        fetchSuccess={getListSuccess}
                        isGettingList={isGettingList}
                        onRefreshList={() => onGetList({
                            clientId,
                            filterIndex: currentFilterIndex,
                            weeksFromNow,
                        })}
                        renderRow={({item}) =>
                            <ScheduleRow
                                bookingStatus={item.get('bookingStatus')}
                                isLoading={item.get('isLoading')}
                                isReadOnly={weeksFromNow !== 0}
                                name={item.getIn(['name'])}
                                onItemSelected={() => onViewDetailButtonTapped({clientId, item}, navigation)}
                                onUnBookItem={() => onUnBookButtonTapped({clientId, item}, navigation)}
                                staffName={item.getIn(['staff', 'name'])}
                                startDateTime={item.get('startDateTime')}
                                venue={item.getIn(['location', 'name'])}
                            />
                        }
                    />
                </VerticalLayout>
            </ScreenContainer>
        )
    }
}
