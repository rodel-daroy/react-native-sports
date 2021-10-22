/* @flow */

import BookingList from '../common/booking/BookingList'
import BookingRow from '../common/booking/BookingRow'
import COLOR_CONSTANTS from '../colorConstants'
import {dimension} from '../common/isSmallScreen'
import immutablePropTypes from 'react-immutable-proptypes'
import ScreenContainer from '../common/ScreenContainer'
import SlideFilter from '../common/SlideFilter'
import SmallText from '../common/text/SmallText'
import SweatRemainingBalance from './SweatRemainingBalance'
import WeekFilterCoverage from '../common/WeekFilterCoverage'
import {
    Button,
    Platform,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import immutable from 'immutable';


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
    viewSweatTrainersButton: {
        borderRadius: 0,
    },
    programFilter: {
        backgroundColor: 'rgb(40,40,40)',
    },
})

export default class ClassList extends Component {
    static propTypes = {
        activeFilter: PropTypes.string,
        activeFilterIndex: PropTypes.number,
        availableFilters: immutablePropTypes.list,
        clientId: PropTypes.string,
        currentFilterIndex: PropTypes.number,
        filters: immutablePropTypes.list,
        getListSuccess: PropTypes.bool,
        hasMembership: PropTypes.bool,
        isGettingList: PropTypes.bool,
        isGettingSweatBalance: PropTypes.bool,
        isSweatClasses: PropTypes.bool,
        list: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        onBookButtonTapped: PropTypes.func,
        onJoinWaitlistTapped: PropTypes.func,
        onWaitlistedTapped: PropTypes.func,
        onDateCoverageChange: PropTypes.func,
        onDateFilterChange: PropTypes.func,
        onGetList: PropTypes.func,
        onProgramFilterSelected: PropTypes.func,
        onUnBookButtonTapped: PropTypes.func,
        onUnmount: PropTypes.func,
        onViewDetailButtonTapped: PropTypes.func,
        onViewSweatTrainersWasTapped: PropTypes.func,
        sweatBalance: PropTypes.number,
        weeksFromNow: PropTypes.number,
    }

    componentDidMount() {
        const {
            clientId,
            isSweatClasses,
            onGetList,
            currentFilterIndex,
            weeksFromNow,
            activeFilter,
        } = this.props

        onGetList({
            clientId,
            filterIndex: currentFilterIndex,
            weeksFromNow,
            isSweatClasses,
            sessionTypeId: activeFilter,
        })
    }

    componentWillUnmount() {
        this.props.onUnmount()
    }

    render() { // eslint-disable-line complexity
        const {
            availableFilters,
            clientId,
            weeksFromNow,
            currentFilterIndex,
            sweatBalance,
            filters,
            list,
            isGettingList,
            isSweatClasses,
            isGettingSweatBalance,
            getListSuccess,
            hasMembership,
            onBookButtonTapped,
            onJoinWaitlistTapped,
            onWaitlistedTapped,
            onUnBookButtonTapped,
            onViewDetailButtonTapped,
            onViewSweatTrainersWasTapped,
            onGetList,
            onDateFilterChange,
            onDateCoverageChange,
            onProgramFilterSelected,
            activeFilter,
            activeFilterIndex,
            navigation,
        } = this.props

        return (
            <ScreenContainer style={styles.container}>
                {isSweatClasses || hasMembership ?
                    <VerticalLayout
                        verticalAlign
                        weight={1}
                    >
                        <WeekFilterCoverage
                            disabled={isGettingList}
                            onDateCoverageChange={
                                (weeksFromNow) => onDateCoverageChange({
                                    clientId,
                                    weeksFromNow,
                                    isSweatClasses,
                                    sessionTypeId: activeFilter,
                                })
                            }
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
                                (filterIndex) => onDateFilterChange({
                                    clientId,
                                    filterIndex,
                                    weeksFromNow,
                                    isSweatClasses,
                                    sessionTypeId: activeFilter,
                                })
                            }
                        />
                        <SlideFilter
                            currentFilterIndex={activeFilterIndex}
                            disabled={isGettingList}
                            filters={availableFilters.map((program) => program.get('name'))}
                            onCurrentFilterIndexChange={(activeFilterIndex) => onProgramFilterSelected({
                                clientId,
                                filterIndex: currentFilterIndex,
                                availableFilters,
                                activeFilterIndex,
                                weeksFromNow,
                                isSweatClasses,
                            })}
                            style={styles.programFilter}
                        />
                        {
                            isSweatClasses ?
                                <SweatRemainingBalance
                                    isGettingSweatBalance={isGettingSweatBalance}
                                    sweatBalance={sweatBalance}
                                /> : null
                        }
                        <BookingList
                            bookingList={list}
                            fetchSuccess={getListSuccess}
                            isGettingList={isGettingList}
                            onRefreshList={() => onGetList({
                                clientId,
                                currentFilterIndex,
                                weeksFromNow,
                                sessionTypeId: activeFilter,
                            })}
                            renderRow={({item, index}) =>{
                                return <BookingRow
                                    bookingStatus={item.get('bookingStatus')}
                                    isLoading={item.get('isLoading')}
                                    isReadOnly={weeksFromNow !== 0}
                                    name={item.getIn(['classDescription', 'name'])}
                                    onBookItem={() => onBookButtonTapped({clientId, item, isSweatClasses})}
                                    onJoinWaitlist={() => onJoinWaitlistTapped({clientId, item, isSweatClasses})}
                                    onWaitlisted={() => onWaitlistedTapped({clientId, item})}
                                    onUnBookItem={() => onUnBookButtonTapped({clientId, item}, navigation)}
                                    onItemSelected={() => onViewDetailButtonTapped(item, navigation)}
                                    staffName={item.getIn(['staff', 'name'])}
                                    startDateTime={item.get('startDateTime')}
                                    venue={item.getIn(['location', 'name'])}
                                    isWaitlistAvailable={item.get('isWaitlistAvailable') === "true"}
                                />
                            }}
                        />
                        {
                            isSweatClasses ?
                                <Button
                                    onPress={() => onViewSweatTrainersWasTapped(navigation)}
                                    style={styles.viewSweatTrainersButton}
                                >
                                    <SmallText style={styles.text}>VIEW TRAINER PROFILES</SmallText>
                                </Button> : null
                        }
                    </VerticalLayout> :
                    <VerticalLayout
                        horizontalAlign
                        verticalAlign
                        weight={1}
                    >
                        <SmallText style={styles.errorText}>
                            {
                                'You must have an active membership to view classes. Please contact BXR to arrange your membership' // eslint-disable-line max-len
                            }
                        </SmallText>
                    </VerticalLayout>
                }
            </ScreenContainer>
        )
    }
}
