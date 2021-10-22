import {createComponent, StyleSheet, VerticalLayout, HorizontalLayout} from "../RNFReact";
import {mapStateToProps} from "./selectors";
import * as mapDispatchToProps from "./eventHandlers";
import ScreenContainer from "../common/ScreenContainer";
import React, {Component} from "react";
import InputField from "./InputField";
import COLOR_CONSTANTS from "../colorConstants";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";
import {userCreditCard} from "../user/userSelector";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_PURCHASE_BACKGROUND,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    infoContainer: {
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    }
});


export default createComponent({
    displayName: 'UseStoredCardScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class UseStoredCardScreenComponent extends Component {

    render() {
        const {
            userDetails,
            selectedPurchaseItems,
            totalPrice,
            applyPromoTotalPrice,
            onPayStoredCard,
            isPaying,
            paySucceeded,
            userCreditCard,
            promoCode,
            navigation
        } = this.props;

        let productId = selectedPurchaseItems.get(0).get('iD');
        let lastFour = userCreditCard.get('lastFour');
        let cardType = userCreditCard.get('cardType') === undefined ? "VISA" : userCreditCard.get('cardType');
        let productType;
        if(selectedPurchaseItems.get(0).get('firstPaymentAmountTotal') !== undefined) {
            productType = "contract";
        } else {
            productType = "service";
        }

        return (
            <ScreenContainer style={styles.container}>
                <VerticalLayout style={styles.contentContainer}>
                    <InputField
                        value={`${cardType} ENDING IN ${lastFour}`}
                        placeholder={''}
                        editable={false}
                    />
                    <HorizontalLayout style={styles.infoContainer}>
                        <MediumText>TOTAL</MediumText>
                        <MediumText>£{applyPromoTotalPrice}</MediumText>
                    </HorizontalLayout>
                </VerticalLayout>
                <ActionButton
                    isEnable={true}
                    buttonText='PAY SECURELY'
                    isLoading={isPaying}
                    onPress={() => onPayStoredCard(userDetails.get('iD'), productId, productType, applyPromoTotalPrice, promoCode, lastFour, navigation)}
                />
            </ScreenContainer>
        )
    }
});
