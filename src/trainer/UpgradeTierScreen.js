import {createComponent, HorizontalLayout, StyleSheet, Icon, VerticalLayout} from "../RNFReact";

import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from "../common/ScreenContainer";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";
import COLOR_CONSTANTS from "../colorConstants";
import {trainerPaymentSelectors as mapStateToProps} from './selectors'
import * as mapDispatchToProps from "./eventHandlers";
import {Linking, Platform} from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 50,
    },
    headerText: {
        textAlign: 'center',
        paddingBottom: 50,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        fontWeight: 'bold',
    },
    booked: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        paddingVertical: 7,
    },
    countText: {
        paddingTop: 40,
    }
});

const propTypes = {
};

function phoneCall(phoneNumber) {
    const url = `${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${phoneNumber}`;
    Linking.openURL(url);
}

function openMail(mailAddress) {
    const url = `mailto:${mailAddress}`;
    Linking.openURL(url);
}

export default createComponent({
    displayName: 'UpgradeTierScreen',
    mapStateToProps,
    mapDispatchToProps
}, ({
       onPopScreen,
    navigation
    }) => (
    <ScreenContainer style={styles.container}>
        <VerticalLayout
            style={styles.contentContainer}
        >
            <MediumText style={styles.headerText}>YOU NEED TO UPGRADE YOUR {"\n"} SESSION PACK TO BOOK THIS TIER</MediumText>
            <VerticalLayout style={styles.booked}>
                <MediumText style={styles.text}>To upgrade please contact BXR at {"\n"} <MediumText style={{color: '#1e88e5'}} onPress={() => openMail('info@bxrlondon.com')}>info@bxrlondon.com</MediumText></MediumText>
            </VerticalLayout>
            <VerticalLayout>
                <MediumText style={styles.countText}>or call on <MediumText style={{color: '#1e88e5'}} onPress={() => phoneCall('02031463436')}>020 3146 3436</MediumText></MediumText>
            </VerticalLayout>
        </VerticalLayout>
        <ActionButton
            isEnable={true}
            buttonText='OK'
            onPress={() => onPopScreen(navigation)}
        />
    </ScreenContainer>
));
