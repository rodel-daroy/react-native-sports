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
        padding: 5,
        paddingBottom: 50,
    },
    headerText: {
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

export default createComponent({
    displayName: 'BookingCompleteScreen',
    mapStateToProps,
    mapDispatchToProps
}, ({
                                       currentTrainerScheduleDetails,
                                       selectedTierPrice,
                                       onPaymentDone,
                                       bookedTrainerSchedule,
                                       purchasePackInfo,
    navigation
    }) => (
    <ScreenContainer style={styles.container}>
        <VerticalLayout
            style={styles.contentContainer}
        >
            <MediumText style={styles.headerText}>BOOKING COMPLETE!</MediumText>
            <VerticalLayout style={styles.booked}>
                <MediumText style={styles.text}>{currentTrainerScheduleDetails.getIn(['sessionType', 'name'], '')} with {currentTrainerScheduleDetails.getIn(['staff', 'name'], '')}</MediumText>
                <MediumText>{bookedTrainerSchedule.get('bookDisplayDateTime')}</MediumText>
            </VerticalLayout>
            <VerticalLayout>
                <MediumText style={styles.countText}>You have {purchasePackInfo.get('remaining') - 1} sessions remaining</MediumText>
            </VerticalLayout>
        </VerticalLayout>
        <ActionButton
            isEnable={true}
            buttonText='OK'
            onPress={() => onPaymentDone(navigation)}
        />
    </ScreenContainer>
));
