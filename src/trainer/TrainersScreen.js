/* @flow */

import BookingList from '../common/booking/BookingList'
import COLOR_CONSTANTS from '../colorConstants'
import {dimension} from '../common/isSmallScreen'
import immutablePropTypes from 'react-immutable-proptypes'
import {trainerListSelectors as mapStateToProps} from './selectors'
import ScreenContainer from '../common/ScreenContainer'
import SlideFilter from '../common/SlideFilter'
import TrainerRow from './TrainerRow'
import WeekFilterCoverage from '../common/WeekFilterCoverage'
import SmallText from '../common/text/SmallText'
import {
    createComponent,
    StyleSheet,
    Touchable,
    HorizontalLayout,
} from '../RNFReact'
import {Dimensions} from 'react-native';
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from './eventHandlers'
import immutable from 'immutable'
import {PROGRAMID_LIST, TIER_LIST} from "./constants";

const EMPTY_LIST_MESSAGE = 'No appointments available at the moment. Please try again later.'
const FAILED_FETCH_MESSAGE = 'We were unable to display the appointments at this time. Please check your connection and try again.'// eslint-disable-line max-len

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    programFilter: {
        backgroundColor: 'rgb(40,40,40)',
    },
    viewPriceButton: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgb(40,40,40)',
    },
    viewPurchasedPack: {
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: COLOR_CONSTANTS.BXR_PRIMARY,
    },
})

export default createComponent({
    displayName: 'TrainerScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class ClassScreen extends Component {

    static propTypes = {
        availablePrograms: immutablePropTypes.list,
        currentDate: PropTypes.string,
        currentFilterIndex: PropTypes.number,
        filters: immutablePropTypes.list,
        getTrainersSucceeded: PropTypes.bool,
        isGettingTrainers: PropTypes.bool,
        isTreatment: PropTypes.bool,
        onBookTrainerWasTapped: PropTypes.func,
        onDateCoverageChange: PropTypes.func,
        onDateFilterChange: PropTypes.func,
        onGetTrainers: PropTypes.func,
        onProgramFilterSelected: PropTypes.func,
        onRefreshTrainerList: PropTypes.func,
        onViewTrainerWasTapped: PropTypes.func,
        programFilter: PropTypes.string,
        trainers: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        userDetails: immutablePropTypes.map,
        weeksFromNow: PropTypes.number,
        onPriceListTapped: PropTypes.func,
        tiers: immutablePropTypes.list,
        tierFilter: PropTypes.string,
        onTierFilterSelected: PropTypes.func,
        onGetCreditCardInfo: PropTypes.func,
        onPurchasedPackTapped: PropTypes.func,
        clientServices: immutablePropTypes.list,
        purchasedPackInfo: immutablePropTypes.map,
    }

    componentDidMount() {
        const {
            isTreatment,
            currentDate,
            onGetTrainers,
            userDetails,
            onGetCreditCardInfo,
            onGetClientService,
        } = this.props

        onGetTrainers(currentDate, isTreatment);
        onGetCreditCardInfo(userDetails.get('iD'));
        onGetClientService(userDetails.get('iD'));
    }

    componentWillUnmount() {
        this.props.onTierFilterSelected(0);
    }

    renderPurchasedPack() {
        const {
            clientServices,
            programFilter,
            tierFilter,
            purchasedPackInfo,
        } = this.props;
        const width = Dimensions.get('window').width;
        if(purchasedPackInfo === immutable.Map() || Number(purchasedPackInfo.get('remaining')) < 1) {
            // return null;
            return(
                <HorizontalLayout style={styles.viewPurchasedPack}>
                    <HorizontalLayout>
                        <SmallText style={{textAlign: 'center', width: width - 50}}>YOU HAVE 0 REMAINING PT CREDITS</SmallText>
                    </HorizontalLayout>
                </HorizontalLayout>
            )
        } else {
            return (
                <HorizontalLayout style={styles.viewPurchasedPack}>
                    <HorizontalLayout>
                        <SmallText style={{textAlign: 'center', width: width - 50}}>YOU HAVE {purchasedPackInfo.get('remaining')} {purchasedPackInfo.get('name')} SESSIONS REMAINING!</SmallText>
                    </HorizontalLayout>
                </HorizontalLayout>
            );
        }
    }

    render() {
        const {
            availablePrograms,
            trainers,
            isGettingTrainers,
            isTreatment,
            getTrainersSucceeded,
            onBookTrainerWasTapped,
            onViewTrainerWasTapped,
            onProgramFilterSelected,
            onRefreshTrainerList,
            programFilter,
            onDateCoverageChange,
            onDateFilterChange,
            currentDate,
            filters,
            weeksFromNow,
            currentFilterIndex,
            userDetails,
            onPriceListTapped,
            tiers,
            tierFilter,
            onTierFilterSelected,
            purchasedPackInfo,
            navigation
        } = this.props
        return (
            <ScreenContainer style={styles.container}>
                {
                    isTreatment ? null :
                    <HorizontalLayout style={styles.viewPriceButton}>
                        <Touchable onPress={() => onPriceListTapped(navigation)}>
                            <SmallText>VIEW PRICE LIST</SmallText>
                        </Touchable>
                    </HorizontalLayout>
                }
                { isTreatment ? null: this.renderPurchasedPack()}
                <WeekFilterCoverage
                    disabled={isGettingTrainers}
                    onDateCoverageChange={(weeksFromNow) => onDateCoverageChange({weeksFromNow, isTreatment})}
                    weeksFromNow={weeksFromNow}
                />
                <SlideFilter
                    currentFilterIndex={currentFilterIndex}
                    disabled={isGettingTrainers}
                    filterItemStyle={{
                        minWidth: dimension.width / filters.count(),
                    }}
                    filters={filters}
                    onCurrentFilterIndexChange={
                        (filterIndex) => onDateFilterChange({
                            filterIndex,
                            weeksFromNow,
                            isTreatment,
                        })
                    }
                />
                <SlideFilter
                    currentFilterIndex={availablePrograms.findIndex((program) =>
                            program.get('iD') === programFilter)}
                    disabled={isGettingTrainers}
                    filters={availablePrograms.map((program) => program.get('name'))}
                    onCurrentFilterIndexChange={(program) => onProgramFilterSelected(program, currentDate)}
                    style={styles.programFilter}
                />
                {
                    isTreatment ? null :
                    <SlideFilter
                        currentFilterIndex={tiers.findIndex((tier) => tier === tierFilter)}
                        disabled={isGettingTrainers}
                        filters={tiers}
                        onCurrentFilterIndexChange={(tierIndex) => onTierFilterSelected(tierIndex)}
                    />
                }
                <BookingList
                    bookingList={trainers}
                    emptyListMessage={EMPTY_LIST_MESSAGE}
                    failedFetchMessage={FAILED_FETCH_MESSAGE}
                    fetchSuccess={getTrainersSucceeded}
                    isGettingList={isGettingTrainers}
                    onRefreshList={() => onRefreshTrainerList(currentDate, isTreatment)}
                    renderRow={({item}) => (
                        <TrainerRow
                            avatarUrl={item.get('staffImageURL')}
                            onBookTrainer={() => onBookTrainerWasTapped({
                                trainer: item,
                                clientId: userDetails.get('iD'),
                                purchasedPackInfo,
                            }, navigation)}
                            onViewTrainer={() => onViewTrainerWasTapped(item, navigation)}
                            programName={item.get('sessionName')}
                            staffName={item.get('staffName')}
                            buttonText={(purchasedPackInfo === immutable.Map() || Number(purchasedPackInfo.get('remaining') < 1)) && !isTreatment ? "BUY" : "BOOK"}
                        />
                        )}
                />
            </ScreenContainer>
        )
    }
})
