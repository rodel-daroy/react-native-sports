import {createComponent, StyleSheet, VerticalLayout, HorizontalLayout, Row, ScrollView, Touchable} from "../RNFReact";
import {mapStateToProps} from "./selectors";
import * as mapDispatchToProps from "./eventHandlers";
import ScreenContainer from "../common/ScreenContainer";
import React, {Component} from "react";
import InputField from "./InputField";
import COLOR_CONSTANTS from "../colorConstants";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";
import SmallText from "../common/text/SmallText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {setApplyPromoTotalPrice} from "./actionCreators";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_PURCHASE_BACKGROUND,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    infoContainer: {
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    radioIcon: {
        paddingRight: 10,
        fontSize: 23,
        color: 'white',
    },
    radioText: {
        flex: 1,
    },
});

const setDefaultValue = (value) => {
    if(value === undefined){
        return '';
    } else {
        return value;
    }
}

export default createComponent({
    displayName: 'UseStoredCardScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class EnterNewCardScreenComponent extends Component {

    componentWillUnmount() {
        this.props.onSetCardNumber('');
        this.props.onSetCardName('');
        this.props.onSetCardExpiryDate('');
        // this.props.onSetCardExpiryMonth('');
        // this.props.onSetCardExpiryYear('');
    }

    render() {
        const {
            userDetails,
            selectedPurchaseItems,
            totalPrice,
            applyPromoTotalPrice,
            onSetCardNumber,
            onSetCardName,
            onSetCardExpiryDate,
            onSetCardExpiryMonth,
            onSetCardExpiryYear,
            cardInfo,
            onPayNewCard,
            isPaying,
            paySucceeded,
            promoCode,
            onSetSaveCard,
            isSaveCard,
            navigation
        } = this.props;

        let productId = selectedPurchaseItems.get(0).get('iD');
        let cardNumber = cardInfo.get('number');
        let expYear = cardInfo.get('expiryYear');
        let expMonth = cardInfo.get('expiryMonth');
        let expDate = "";
        if(expMonth.length >= 2) {
            expDate = expMonth.substr(0, 2) + "/" + expYear
        } else {
            expDate = expMonth;
        }
        let cardName = cardInfo.get('name');
        let address = setDefaultValue(userDetails.get('addressLine1'));
        let city = setDefaultValue(userDetails.get('city'));
        let state = setDefaultValue(userDetails.get('state'));
        let postalCode = setDefaultValue(userDetails.get('postalCode'));
        let productType;
        if(selectedPurchaseItems.get(0).get('firstPaymentAmountTotal') !== undefined) {
            productType = "contract";
        } else {
            productType = "service";
        }
        return (
            <ScreenContainer style={styles.container}>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps={"never"} bounces={false}>
                    <VerticalLayout>
                        <Row>
                            <InputField
                                value={cardInfo.get('number')}
                                placeholder={'CARD NUMBER'}
                                onValueChange={(text) => onSetCardNumber(text)}
                                keyboardType='numeric'
                            />
                        </Row>
                        <Row>
                            <InputField
                                value={cardInfo.get('name')}
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
                        <Touchable onPress={() => onSetSaveCard()}>
                            <Row>
                                <MaterialIcons style={styles.radioIcon}
                                      name={isSaveCard ? 'radio-button-checked' : 'radio-button-unchecked'}/>
                                <SmallText style={styles.radioText}>Save this card to account</SmallText>
                            </Row>
                        </Touchable>
                    </VerticalLayout>
                    <VerticalLayout>
                        <HorizontalLayout style={styles.infoContainer}>
                            <MediumText>TOTAL</MediumText>
                            <MediumText>£{applyPromoTotalPrice}</MediumText>
                        </HorizontalLayout>
                    </VerticalLayout>
                </ScrollView>
                <ActionButton
                    isEnable={true}
                    buttonText='PAY SECURELY'
                    isLoading={isPaying}
                    onPress={() => onPayNewCard(userDetails.get('iD'), productId, productType, applyPromoTotalPrice, promoCode, cardNumber, expYear, expMonth, cardName, address, city, state, postalCode, isSaveCard, navigation)}
                />
            </ScreenContainer>
        )
    }
});
