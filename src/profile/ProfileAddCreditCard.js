import {createComponent, StyleSheet, VerticalLayout, HorizontalLayout, Row, ScrollView, TextInput, Button, ActivityIndicator} from "../RNFReact";
import React, {Component} from "react";
import {manageCreditCardEventHandlers as mapDispatchToProps, onSaveCreditCard} from './eventHandlers'
import {manageCreditCardScreenSelector as mapStateToProps} from './selectors'
import COLOR_CONSTANTS from "../colorConstants";
import MediumText from "../common/text/MediumText";
import BackgroundImageContainer from "../common/BackgroundImageContainer";


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
    InputContainer: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: 50,
        marginHorizontal: -7,
        paddingHorizontal: 20,
        fontSize: 17,
        color: 'white',
        backgroundColor: 'black'
    },
    button: {
        marginTop: 1,
        borderRadius: 0,
    },
    disabledButton: {
        marginTop: 1,
        borderRadius: 0,
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
});

const setDefaultValue = (value) => {
    if(value === undefined){
        return '';
    } else {
        return value;
    }
}

const InputField = createComponent({displayName: 'InputField'}, ({
                                                                                onValueChange,
                                                                                ...props
                                                                            }) => (
    <HorizontalLayout style={styles.InputContainer}>
        <TextInput
            {...props}
            style={styles.textInput}
            placeholderTextColor={'#888888'}
            onChangeText={(text) => onValueChange(text)}
        />
    </HorizontalLayout>
));

const ActionButton = createComponent({displayName: 'ActionButton'}, ({
                                                                         isEnable,
                                                                         isLoading,
                                                                         onPress,
                                                                         buttonText,
                                                                     }) => {
    const shouldDisableButton = !isEnable || isLoading;
    const buttonStyle = shouldDisableButton ? styles.disabledButton : styles.button;
    return (
        <Button
            disabled={shouldDisableButton}
            onPress={() => onPress()}
            style={buttonStyle}
        >
            {
                isLoading ?
                    <ActivityIndicator
                        animating
                        color={COLOR_CONSTANTS.BXR_SECONDARY}
                        size='large'
                        style={styles.loader}
                    /> :
                    buttonText
            }
        </Button>
    );
});

export default createComponent({
    displayName: 'UseStoredCardScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class EnterNewCardScreenComponent extends Component {

    componentWillUnmount() {
        this.props.onSetTempCreditCardNumber('');
        this.props.onSetTempCreditCardName('');
        this.props.onSetTempCardExpiryDate('');
        // this.props.onSetTempCreditCardExpiryMonth('');
        // this.props.onSetTempCreditCardExpiryYear('');
    }

    render() {
        const {
            titleText,
            userDetails,
            onSetTempCreditCardNumber,
            onSetTempCreditCardName,
            onSetTempCardExpiryDate,
            onSetTempCreditCardExpiryMonth,
            onSetTempCreditCardExpiryYear,
            tempCreditCardInfo,
            isSavingCreditCard,
            onSaveCreditCard,
            navigation,
        } = this.props;

        let cardNumber = tempCreditCardInfo.get('number');
        let cardName = tempCreditCardInfo.get('name');
        let expYear = tempCreditCardInfo.get('expiryYear');
        let expMonth = tempCreditCardInfo.get('expiryMonth');
        let expDate = "";
        if(expMonth.length >= 2) {
            expDate = expMonth.substr(0, 2) + "/" + expYear
        } else {
            expDate = expMonth;
        }
        let address = setDefaultValue(userDetails.get('addressLine1'));
        let city = setDefaultValue(userDetails.get('city'));
        let state = setDefaultValue(userDetails.get('state'));
        let postalCode = setDefaultValue(userDetails.get('postalCode'));
        return (
            <BackgroundImageContainer
                backgroundIndex={10}
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps={"never"} bounces={false}>
                    <VerticalLayout>
                        <Row>
                            <InputField
                                value={cardNumber}
                                placeholder={'CARD NUMBER'}
                                onValueChange={(text) => onSetTempCreditCardNumber(text)}
                                keyboardType='numeric'
                            />
                        </Row>
                        <Row>
                            <InputField
                                value={cardName}
                                placeholder={'NAME ON CARD'}
                                onValueChange={(text) => onSetTempCreditCardName(text)}
                            />
                        </Row>
                        <Row>
                            <InputField
                                value={expDate}
                                placeholder={'EXPIRY DATE(MM/YYYY)'}
                                onValueChange={(text) => onSetTempCardExpiryDate(text)}
                                keyboardType='numeric'
                            />
                        </Row>
                        {/*<Row>*/}
                            {/*<InputField*/}
                                {/*value={expMonth}*/}
                                {/*placeholder={'EXPIRY MONTH'}*/}
                                {/*onValueChange={(text) => onSetTempCreditCardExpiryMonth(text)}*/}
                                {/*keyboardType='numeric'*/}
                            {/*/>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                            {/*<InputField*/}
                                {/*value={expYear}*/}
                                {/*placeholder={'EXPIRY YEAR'}*/}
                                {/*onValueChange={(text) => onSetTempCreditCardExpiryYear(text)}*/}
                                {/*keyboardType='numeric'*/}
                            {/*/>*/}
                        {/*</Row>*/}
                    </VerticalLayout>
                </ScrollView>
                <ActionButton
                    isEnable={true}
                    buttonText='SAVE'
                    isLoading={isSavingCreditCard}
                    onPress={() => onSaveCreditCard(userDetails.get('iD'), cardNumber, cardName, address, city, state, postalCode, expMonth, expYear, navigation)}
                />
            </BackgroundImageContainer>
        )
    }
});
