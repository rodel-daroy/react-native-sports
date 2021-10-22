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
    ScrollView,
    VerticalLayout, Row, Touchable
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from './eventHandlers'
import immutable from 'immutable'
import ActionButton from "./ActionButton";
import {userCreditCard} from "../user/userSelector";
import InputField from "../payment/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
    },
    dateText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        padding: 10,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        borderTopWidth: 3,
        borderColor: 'black',
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderBottomWidth: 3,
        borderBottomColor: 'black',
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    itemNameText: {
        fontSize: 17,
        paddingTop: 10,
    },
    descText: {
        paddingTop: 10,
    },
    totalPrice: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderTopWidth: 3,
        borderTopColor: 'black'
    },
    cardContainer: {
        paddingHorizontal: 15,
    },
    radioIcon: {
        paddingRight: 10,
        fontSize: 23,
        color: 'white',
    },
    radioText: {
        flex: 1,
    },
})

const formatPrice = (price) => R.isNil(price) ? '' : `£${price}`

const setDefaultValue = (value) => {
    if(value === undefined){
        return '';
    } else {
        return value;
    }
}

export default createComponent({
    displayName: 'TrainerPaymentScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class TrainerPaymentScreen extends Component {

    static propTypes = {
        currentDate: PropTypes.string,
        isLoadingPrice: PropTypes.bool,
        availablePrograms: immutablePropTypes.list,
        onSelectTierPrice: PropTypes.func,
        selectedTierPrice: immutablePropTypes.map,
        programFilter: PropTypes.string,
    };

    componentWillUnmount() {
        this.props.onSetCardNumber('');
        this.props.onSetCardName('');
        this.props.onSetCardExpiryDate('');
        // this.props.onSetCardExpiryMonth('');
        // this.props.onSetCardExpiryYear('');
    }

    renderCardForm() {
        const {
            onSetCardNumber,
            onSetCardName,
            onSetCardExpiryDate,
            onSetCardExpiryMonth,
            onSetCardExpiryYear,
            onSetSaveCard,
            isSaveCard,
            tempCardInfo,
            programFilter,
        } = this.props;
        if(true){ // if(programFilter !== "2") {
            return null;
        } else {
            let cardNumber = tempCardInfo.get('number');
            let expYear = tempCardInfo.get('expiryYear');
            let expMonth = tempCardInfo.get('expiryMonth');
            let expDate = "";
            if(expMonth.length >= 2) {
                expDate = expMonth.substr(0, 2) + "/" + expYear
            } else {
                expDate = expMonth;
            }
            let cardName = tempCardInfo.get('name');
            return (
                <VerticalLayout style={styles.cardContainer}>
                    <Row>
                        <InputField
                            value={cardNumber}
                            placeholder={'CARD NUMBER'}
                            onValueChange={(text) => onSetCardNumber(text)}
                            keyboardType='numeric'
                        />
                    </Row>
                    <Row>
                        <InputField
                            value={cardName}
                            placeholder={'NAME ON CARD'}
                            onValueChange={(text) => onSetCardName(text)}
                        />
                    </Row>
                    <Row>
                        <InputField
                            value={expDate}
                            placeholder={'EXPIRY DATE(MM/YYYY)'}
                            onValueChange={(text) => onSetCardExpiryDate(text)}
                            keyboardType='numeric'
                        />
                    </Row>
                    {/*<Row>*/}
                        {/*<InputField*/}
                            {/*value={expMonth}*/}
                            {/*placeholder={'EXPIRY MONTH'}*/}
                            {/*onValueChange={(text) => onSetCardExpiryMonth(text)}*/}
                            {/*keyboardType='numeric'*/}
                        {/*/>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                        {/*<InputField*/}
                            {/*value={expYear}*/}
                            {/*placeholder={'EXPIRY YEAR'}*/}
                            {/*onValueChange={(text) => onSetCardExpiryYear(text)}*/}
                            {/*keyboardType='numeric'*/}
                        {/*/>*/}
                    {/*</Row>*/}
                    <Touchable onPress={() => onSetSaveCard()}>
                        <Row>
                            <MaterialIcons style={styles.radioIcon}
                                  name={isSaveCard ? 'radio-button-checked' : 'radio-button-unchecked'}/>
                            <SmallText style={styles.radioText}>Save this card to account</SmallText>
                        </Row>
                    </Touchable>
                </VerticalLayout>
            );
        }
    }

    renderActionButton() {
        const {
            programFilter,
            onUseStoreCard,
            onEnterNewCard,
            userCreditCard,
            isPaying,
            onPayNewCard,
            selectedTierPrice,
            tempCardInfo,
            userDetails,
            isSaveCard,
            bookedTrainerSchedule,
            navigation,
        } = this.props;

        if(false){  //if(programFilter === "2"){
            let cardNumber = tempCardInfo.get('number');
            let expYear = tempCardInfo.get('expiryYear');
            let expMonth = tempCardInfo.get('expiryMonth');
            let cardName = tempCardInfo.get('name');
            let address = setDefaultValue(userDetails.get('addressLine1'));
            let city = setDefaultValue(userDetails.get('city'));
            let state = setDefaultValue(userDetails.get('state'));
            let postalCode = setDefaultValue(userDetails.get('postalCode'));
            return (
                <ActionButton
                    isEnable={true}
                    isLoading={isPaying}
                    buttonText='PAY SECURELY'
                    onPress={() => onPayNewCard(userDetails.get('iD'), selectedTierPrice.get('iD'), selectedTierPrice.get('price'), cardNumber, expYear, expMonth,
                        cardName, address, city, state, postalCode, isSaveCard,
                        bookedTrainerSchedule.get('bookDateTime'),
                        bookedTrainerSchedule.getIn(['staff', 'iD'], ''),
                        bookedTrainerSchedule.getIn(['sessionType', 'iD'], ''), navigation)}
                />
            )
        } else {
            let isShowStoredCard = true;
            if (userCreditCard.get('lastFour') === undefined || userCreditCard.get('lastFour') === '') {
                isShowStoredCard = false;
            }
            return (
                <VerticalLayout>
                    {
                        isShowStoredCard ?
                            <ActionButton
                                isEnable={true}
                                isLoading={false}
                                buttonText='USE STORED CARD'
                                onPress={() => onUseStoreCard(navigation)}
                            /> : null
                    }
                    <ActionButton
                        isEnable={true}
                        isLoading={false}
                        buttonText='ENTER NEW CARD DETAILS'
                        onPress={() => onEnterNewCard(navigation)}
                    />
                </VerticalLayout>
            );
        }
    }

    render() {
        const {
            currentTrainerScheduleDetails,
            currentDate,
            isLoadingPrice,
            selectedTierPrice,
            onUseStoreCard,
            onEnterNewCard,
            userCreditCard,
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
                <VerticalLayout
                    style={styles.contentContainer}
                >
                    <ScrollView keyboardShouldPersistTaps={"never"} bounces={false}>
                        <VerticalLayout style={styles.itemContainer}>
                            <MediumText style={styles.titleText}>{selectedTierPrice.get('name')}</MediumText>
                            {/*<MediumText style={styles.itemNameText}>{selectedTierPrice.get('name')}</MediumText>*/}
                            {/*<SmallText style={styles.descText}>{selectedTierPrice.get('desc')}</SmallText>*/}
                        </VerticalLayout>
                        {this.renderCardForm()}
                    </ScrollView>
                    <HorizontalLayout style={styles.totalPrice}>
                        <MediumText>TOTAL</MediumText>
                        <MediumText>£{Number(selectedTierPrice.get('price')).toFixed(2)}</MediumText>
                    </HorizontalLayout>
                </VerticalLayout>
                {this.renderActionButton()}
            </ScreenContainer>
        );
    }
})

