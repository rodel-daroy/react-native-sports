import {createComponent, HorizontalLayout, StyleSheet, Icon, VerticalLayout} from "../RNFReact";

import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from "../common/ScreenContainer";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";
import COLOR_CONSTANTS from "../colorConstants";
import {mapStateToProps} from "./selectors";
import * as mapDispatchToProps from "./eventHandlers";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_PURCHASE_BACKGROUND,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
    },
    icon: {
        paddingRight: 10,
        fontSize: 37,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
    }
});

const propTypes = {};

export default createComponent({
    displayName: 'PaymentCompleteScreen',
    mapStateToProps,
    mapDispatchToProps
}, ({
       onReturnBookSession,
       onPaymentDone,
                                       navigation
    }) => (
    <ScreenContainer style={styles.container}>
        <HorizontalLayout
            style={styles.contentContainer}
        >
            <Icon style={styles.icon} name={'check-circle'} iconSet='MaterialCommunityIcons'/>
            <MediumText style={styles.text}>PAYMENT COMPLETE</MediumText>
        </HorizontalLayout>
        <ActionButton
            isEnable={true}
            buttonText='BOOK A SESSION'
            onPress={() => onReturnBookSession(navigation)}
        />
        <ActionButton
            isEnable={true}
            buttonText='DONE'
            onPress={() => onPaymentDone(navigation)}
        />
    </ScreenContainer>
));
