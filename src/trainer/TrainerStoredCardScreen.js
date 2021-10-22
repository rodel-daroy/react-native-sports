import {createComponent, StyleSheet, VerticalLayout, HorizontalLayout} from "../RNFReact";
import {trainerPaymentSelectors as mapStateToProps} from './selectors'
import * as mapDispatchToProps from "./eventHandlers";
import ScreenContainer from "../common/ScreenContainer";
import React, {Component} from "react";
import InputField from "../payment/InputField";
import COLOR_CONSTANTS from "../colorConstants";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";

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
    displayName: 'TrainerStoredCardScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class TrainerStoredCardScreen extends Component {

    render() {
        const {
            userDetails,
            userCreditCard,
            selectedTierPrice,
            onPayStoredCard,
            isPaying,
            bookedTrainerSchedule,
            navigation,
        } = this.props;
        let lastFour = userCreditCard.get('lastFour');
        let cardType = userCreditCard.get('cardType') === undefined ? "VISA" : userCreditCard.get('cardType');
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
                        <MediumText>£{Number(selectedTierPrice.get('price')).toFixed(2)}</MediumText>
                    </HorizontalLayout>
                </VerticalLayout>
                <ActionButton
                    isEnable={true}
                    buttonText='PAY SECURELY'
                    isLoading={isPaying}
                    onPress={() => onPayStoredCard(userDetails.get('iD'), selectedTierPrice.get('iD'), selectedTierPrice.get('price'),
                        bookedTrainerSchedule.get('bookDateTime'),
                        bookedTrainerSchedule.getIn(['staff', 'iD'], ''),
                        bookedTrainerSchedule.getIn(['sessionType', 'iD'], ''), navigation)}
                />
            </ScreenContainer>
        )
    }
});
