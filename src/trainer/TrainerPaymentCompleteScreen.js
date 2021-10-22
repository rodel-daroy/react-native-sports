import {createComponent, HorizontalLayout, StyleSheet, Icon, VerticalLayout} from "../RNFReact";

import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from "../common/ScreenContainer";
import ActionButton from "./ActionButton";
import MediumText from "../common/text/MediumText";
import COLOR_CONSTANTS from "../colorConstants";
import {trainerPaymentSelectors as mapStateToProps} from './selectors'
import * as mapDispatchToProps from "./eventHandlers";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 50,
    },
    headerText: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        fontWeight: 'bold',
    },
    booked: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    purchased: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        fontWeight: 'bold',
        paddingTop: 30,
        paddingBottom: 10,
    },
    text: {
        textAlign: 'center',
        paddingVertical: 7,
    }
});

const propTypes = {
};

export default createComponent({
    displayName: 'PaymentCompleteScreen',
    mapStateToProps,
    mapDispatchToProps
}, ({
       currentTrainerScheduleDetails,
       selectedTierPrice,
       onPaymentDone,
       bookedTrainerSchedule,
                                       navigation
    }) => (
    <ScreenContainer style={styles.container}>
        <VerticalLayout
            style={styles.contentContainer}
        >
            <MediumText style={styles.headerText}>BOOKING & PAYMENT COMPLETE!</MediumText>
            <VerticalLayout style={styles.booked}>
                <MediumText style={styles.mainText}>BOOKED</MediumText>
                <MediumText style={styles.text}>{currentTrainerScheduleDetails.getIn(['sessionType', 'name'], '')} with {currentTrainerScheduleDetails.getIn(['staff', 'name'], '')}</MediumText>
                <MediumText>{bookedTrainerSchedule.get('bookDisplayDateTime')}</MediumText>
            </VerticalLayout>
            <VerticalLayout style={styles.purchased}>
                <MediumText style={styles.mainText}>PURCHASED</MediumText>
                <MediumText style={styles.text}>
                    {selectedTierPrice.get('name')}
                </MediumText>
                <MediumText style={styles.text}>You have {selectedTierPrice.get('count') - 1} sessions remaining</MediumText>
            </VerticalLayout>
        </VerticalLayout>
        <ActionButton
            isEnable={true}
            buttonText='OK'
            onPress={() => onPaymentDone(navigation)}
        />
    </ScreenContainer>
));
