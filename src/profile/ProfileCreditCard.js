import {ActivityIndicator, createComponent, Row, StyleSheet, VerticalLayout} from "../RNFReact";
import React from "react";
import COLOR_CONSTANTS from "../colorConstants";
import SmallText from "../common/text/SmallText";
import GroupInput from "../common/form/GroupInput";

const styles = StyleSheet.create({
    loader: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    loaderContainer: {
        borderTopWidth: 1,
        borderTopColor: COLOR_CONSTANTS.BXR_TEXT,
        borderStyle: 'solid',
        paddingVertical: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
    },
});

const Loader = createComponent({displayName: 'Loader'}, () =>
    <VerticalLayout
        horizontalAlign
        style={styles.loaderContainer}
        verticalAlign
    >
        <ActivityIndicator
            animating
            color={COLOR_CONSTANTS.BXR_PRIMARY}
            size='large'
            style={styles.loader}
        />
    </VerticalLayout>,
)

export default createComponent({displayName: 'ProfilePreferences'}, ({
                                                                         userCreditCard,
                                                                         isGettingCreditCard,
                                                                         onAddCreditCard,
                                                                         onChangeCreditCard,
    navigation
}) => {
    if(isGettingCreditCard) {
        return(
            <Loader/>
        );
    } else {
        let lastFour = userCreditCard.get('lastFour');
        if(lastFour === undefined || lastFour === "") {
            return (
                <GroupInput iconName='credit-card'>
                    <Row
                        onPress={() => onAddCreditCard(navigation)}
                        style={styles.button}
                    >
                        <SmallText>Store Card</SmallText>
                    </Row>
                </GroupInput>
            );
        } else {
            return (
                <GroupInput iconName='credit-card'>
                    <Row
                        onPress={() => onChangeCreditCard(navigation)}
                        style={styles.button}
                    >
                        <SmallText>Change stored card</SmallText>
                    </Row>
                </GroupInput>
            );
        }
    }
});
