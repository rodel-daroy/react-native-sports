
import {Component} from "react";
import React from "react";
import {createComponent, StyleSheet, Scrollable, VerticalLayout} from "../RNFReact";
import ScreenContainer from '../common/ScreenContainer'
import {trainerListSelectors as mapStateToProps} from "./selectors";
import * as mapDispatchToProps from "./eventHandlers";
import {TIER_PRICE_LIST} from './constants';
import COLOR_CONSTANTS from '../colorConstants'
import SmallText from '../common/text/SmallText'
import MediumText from '../common/text/MediumText'

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
    },
    headerText: {
        textAlign: 'center',
        padding: 15,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND
    },
    typeContainer: {
        padding: 20,
        borderBottomColor: '#999999',
    },
    typeText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLOR_CONSTANTS.BXR_PRIMARY,
    },
    subTypeText: {
        paddingTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    itemText: {
        color: '#999999',
    },
});

export default createComponent({
    displayName: 'TrainerPriceListScreen',
    mapStateToProps,
    mapDispatchToProps,
}, class ClassScreen extends Component {
    render() {
        return(
            <ScreenContainer>
                <VerticalLayout weight={1}>
                    <VerticalLayout verticalAlign horizontalAlign style={styles.header}>
                        <SmallText style={styles.headerText}>
                            Purchase your training in packs to reduce the cost per class.
                            PT packs are available for Tier 1 and Tier 2 trainers.
                            Each pack can be used to train with one or multiple coaches within the same tier group.
                            Our Mixed packages are also available for Tier 1 and Tier 2 training.
                            Your packs must be used by the expiry date, specified in the pack description.
                        </SmallText>
                    </VerticalLayout>
                    <Scrollable style={styles.contentContainer} bounces={false}>
                        <VerticalLayout style={[styles.typeContainer, {borderBottomWidth: 1}]}>
                            <MediumText style={styles.typeText}>PERSONAL TRAINING</MediumText>
                            <MediumText style={styles.subTypeText}>TIER 2</MediumText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.personal[0].items[0].desc}</SmallText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.personal[1].items[0].desc}</SmallText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.personal[1].items[1].desc}</SmallText>
                        </VerticalLayout>
                        <VerticalLayout style={styles.typeContainer}>
                            <MediumText style={styles.typeText}>COMBAT COACHING</MediumText>
                            <MediumText style={styles.subTypeText}>TIER 1</MediumText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.combat[0].items[0].desc}</SmallText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.combat[1].items[0].desc}</SmallText>
                            <SmallText style={styles.itemText}>• {TIER_PRICE_LIST.combat[1].items[1].desc}</SmallText>
                            <MediumText style={styles.subTypeText}>TIER 2</MediumText>
                            <SmallText style={styles.itemText}>
                                • Single Session: £85
                            </SmallText>
                            <SmallText style={styles.itemText}>
                                • Middleweight Package (12 sessions): £930(£77.50 per session) This package is associated with a £90 saving and has a 6 month expiry
                            </SmallText>
                            <SmallText style={styles.itemText}>
                                • Heavyweight Package (24 sessions): £1,800(£75.00 per session) This package is associated with a £240 saving and has nine-month expiry
                            </SmallText>
                        </VerticalLayout>
                    </Scrollable>
                </VerticalLayout>
            </ScreenContainer>
        );
    }
});
