/* @flow */

import Avatar from '../common/Avatar'
import COLOR_CONSTANTS from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import {trainerSchedulesSelectors as mapStateToProps} from './selectors'
import R from 'ramda'
import ScreenContainer from '../common/ScreenContainer'
import MediumText from '../common/text/MediumText'
import SmallText from '../common/text/SmallText'
import TrainerPriceButton from './TrainerPriceButton';
import {
    ActivityIndicator,
    createComponent,
    HorizontalLayout,
    StyleSheet,
    Scrollable,
    VerticalLayout,
    Touchable,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from './eventHandlers'
import immutable from 'immutable'
import ActionButton from "./ActionButton";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
    },
    header: {
        backgroundColor: 'rgb(0, 0, 0)',
        padding: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 2,
        marginHorizontal: 20,
    },
    dateHeaderContainer: {
        borderBottomWidth: 3,
        borderColor: 'black',
    },
    dateText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        padding: 10,
    },
    priceList: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    priceContentList: {
        paddingBottom: 30,
    },
    priceItem: {
        marginBottom: 20,
    },
    descText: {
        marginLeft: 3,
        marginBottom: 5,
        fontSize: 16,
    },
    priceButton: {
        marginTop: 5
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})



const formatPrice = (price) => R.isNil(price) ? '' : `£${price}`

export default createComponent({
        displayName: 'TrainerConfirmScreen',
        mapStateToProps,
        mapDispatchToProps,
    }, class TrainerConfirmScreen extends Component {

    static propTypes = {
        currentDate: PropTypes.string,
        currentTrainer: immutablePropTypes.contains(
            immutablePropTypes.map.isRequired,
        ),
        currentSessionTypeId: PropTypes.string,
        onBookTrainerSchedule: PropTypes.func,
        isLoadingPrice: PropTypes.bool,
        availablePrograms: immutablePropTypes.list,
        onSelectTierPrice: PropTypes.func,
        selectedTierPrice: immutablePropTypes.map,
        isGettingPriceItems: PropTypes.bool,
        programFilter: PropTypes.string,
        tierFilter: PropTypes.string,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.props.onSelectTierPrice(immutable.Map());
    }

    getTierFilterString() {
        let sessionName = this.props.currentTrainerScheduleDetails.getIn(['sessionType', 'name'], '');
        if(sessionName.indexOf('Personal') !== -1){
            return "Personal";
        }
        if(sessionName.indexOf("Tier 1") !== -1){
            return "Tier 1";
        }
        if(sessionName.indexOf("Tier 2") !== -1){
            return "Tier 2";
        }
        return "";
    }

    renderPriceItem(items) {
        const {
            availablePrograms,
            programFilter,
            onSelectTierPrice,
            selectedTierPrice,
        } = this.props;
        return (
            items.map((item, index) => {
                let name = item.get('name');
                // name = name.replace(/Tier 1: Combat Training |Tier 2: Combat Training |Tier 1 Mixed: |Tier 2 Mixed: |Tier 1: S & C Training |Tier 2: S & C Training |Personal Training - |Tier 1:|Tier 2:/gi, "");
                return (
                    <TrainerPriceButton
                        style={styles.priceButton}
                        key={index}
                        id={item.get('id')}
                        itemName={name}
                        itemPrice={Number(item.get('price')).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        isChecked={item.get('iD') === selectedTierPrice.get('iD')}
                        onPress={() => onSelectTierPrice(item)}
                    />
                );
            })
        );
    }

    renderOnePrices() {
        const {availablePrograms, programFilter, tierPriceItems} = this.props;
        let items = tierPriceItems.filter((obj) => {
            return (obj.get('programID') === programFilter) && (obj.get('name').indexOf(this.getTierFilterString()) !== -1) && (obj.get('name').indexOf('x') === -1 )
        });
        if(items.size === 0) {
            return null;
        }
        return (
            <VerticalLayout style={styles.priceItem} key={0}>
                <MediumText style={styles.descText}>HOW WOULD YOU LIKE TO PAY?</MediumText>
                {this.renderPriceItem(items)}
            </VerticalLayout>
        )
    }

    renderSinglePrices() {
        const {availablePrograms, programFilter, tierPriceItems, currentTrainerScheduleDetails} = this.props;
        let program = availablePrograms.find((o) => o.get('iD') === programFilter);

        let items = tierPriceItems.filter((obj) => {
            return (obj.get('programID') === programFilter) && (obj.get('name').indexOf(this.getTierFilterString()) !== -1) && (obj.get('name').indexOf('x') !== -1 )
        });
        if(items.size === 0) {
            return null;
        }
        return (
            <VerticalLayout style={styles.priceItem} key={1}>
                <MediumText style={styles.descText}>
                    {program.get('name').indexOf('Personal') === 0 ? 'PERSONAL TRAINING PACK' : this.getTierFilterString() + ' ' + program.get('name').toUpperCase() +' COACHING PACK'}
                </MediumText>
                {this.renderPriceItem(items)}
            </VerticalLayout>
        )
    }

    renderMixedPrices() {
        const {availablePrograms, programFilter, tierPriceItems} = this.props;
        let program = availablePrograms.find((o) => o.get('iD') === programFilter);
        const tierFilterString = this.getTierFilterString();
        if(tierFilterString.length === 0) {
            return null;
        }
        let items = tierPriceItems.filter((obj) => {
            return (obj.get('programID') == "8") && (obj.get('name').indexOf(tierFilterString) !== -1)
        });
        if(items.size === 0) {
            return null;
        }
        return (
            <VerticalLayout style={styles.priceItem} key={2}>
                <MediumText style={styles.descText}>
                    {program.get('name').indexOf('Personal') === 0 ? 'MIXED TRAINING PACK' : this.getTierFilterString() + ' MIXED COACHING PACK'}
                </MediumText>
                {this.renderPriceItem(items)}
            </VerticalLayout>
        )
    }

    render() {
        const {
            currentTrainerScheduleDetails,
            currentDate,
            isLoadingPrice,
            selectedTierPrice,
            onPayNowTapped,
            isGettingPriceItems,
            onFindMoreTapped,
            navigation
        } = this.props;

        return (
            <ScreenContainer style={styles.container}>
                <HorizontalLayout
                    style={styles.header}
                    verticalAlign
                >
                    <HorizontalLayout verticalAlign>
                        <Avatar
                            avatarUrl={currentTrainerScheduleDetails.getIn(['staff', 'imageURL'])}
                            style={styles.avatar}
                        />
                    </HorizontalLayout>
                    <VerticalLayout
                        verticalAlign
                        weight={1}
                    >
                        <HeaderText>{currentTrainerScheduleDetails.getIn(['staff', 'name'], '')}</HeaderText>
                        <SmallText>{currentTrainerScheduleDetails.getIn(['sessionType', 'name'], '')}</SmallText>
                        {
                            isLoadingPrice ?
                                <ActivityIndicator
                                    animating
                                    size='small'
                                    style={styles.priceActivityIndicator}
                                /> :
                                <SmallText>{formatPrice(currentTrainerScheduleDetails.get('price'))}</SmallText>
                        }
                    </VerticalLayout>
                </HorizontalLayout>
                <HorizontalLayout
                    horizontalAlign
                    style={styles.dateHeaderContainer}
                    verticalAlign
                >
                    <SmallText style={styles.dateText}> {currentDate}</SmallText>
                </HorizontalLayout>
                {
                    isGettingPriceItems ?
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
                        :
                        <Scrollable
                            bounces={false}
                            weight={1}
                            style={styles.priceList}
                            contentContainerStyle={styles.priceContentList}
                        >
                            {this.renderOnePrices()}
                            {this.renderSinglePrices()}
                            {this.renderMixedPrices()}
                            <MediumText style={styles.descText}>WHAT ARE PACKS?
                                <MediumText style={[styles.descText, {color: '#1e88e5'}]} onPress={() => onFindMoreTapped(navigation)}>  Find out more here
                                </MediumText>
                            </MediumText>
                        </Scrollable>
                }
                {
                    isGettingPriceItems ? null :
                    <ActionButton
                        isEnable={!selectedTierPrice.equals(immutable.Map())}
                        isLoading={false}
                        buttonText='PAY NOW'
                        onPress={() => onPayNowTapped(navigation)}
                    />
                }
            </ScreenContainer>
        );
    }
})

