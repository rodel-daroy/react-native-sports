import {createComponent, StyleSheet, VerticalLayout, HorizontalLayout, Row, ScrollView, TextInput, Button, ActivityIndicator} from "../RNFReact";
import React, {Component} from "react";
import {manageCreditCardEventHandlers as mapDispatchToProps} from './eventHandlers'
import {manageCreditCardScreenSelector as mapStateToProps} from './selectors'
import COLOR_CONSTANTS from "../colorConstants";
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
    displayName: 'ProfileChangeCreditCard',
    mapStateToProps,
    mapDispatchToProps,
}, class ProfileChangeCreditCard extends Component {

    render() {
        const {
            titleText,
            userDetails,
            userCreditCard,
            isSavingCreditCard,
            onRemoveCreditCard,
            onUpdateCreditCard,
            navigation
        } = this.props;
        let lastFour = userCreditCard.get('lastFour');
        let cardType = userCreditCard.get('cardType') === undefined ? "VISA" : userCreditCard.get('cardType');
        return (

            <BackgroundImageContainer
                backgroundIndex={10}
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <VerticalLayout style={styles.contentContainer}>
                    <InputField
                        value={`${cardType} ENDING IN ${lastFour}`}
                        placeholder={''}
                        editable={false}
                    />
                </VerticalLayout>
                <ActionButton
                    isEnable={true}
                    buttonText='REMOVE CARD'
                    isLoading={isSavingCreditCard}
                    onPress={() => onRemoveCreditCard(userDetails.get('iD'), navigation)}
                />
                <ActionButton
                    isEnable={true}
                    buttonText='UPDATE CARD'
                    isLoading={false}
                    onPress={() => onUpdateCreditCard(navigation)}
                />
            </BackgroundImageContainer>
        )
    }
});
