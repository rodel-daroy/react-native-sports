import {createComponent, StyleSheet, Image, Touchable, VerticalLayout} from "../RNFReact";
import LargeText from "../common/text/LargeText";
import React from 'react';
import PropTypes from 'prop-types';
import COLOR_CONSTANTS from "../colorConstants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
    sectionButton: {
        flex: 1,
        overflow: 'hidden',
        borderBottomColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
        backgroundColor: COLOR_CONSTANTS.BXR_PURCHASE_BACKGROUND,
    },
    buttonImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionButtonText: {
        backgroundColor: 'transparent'
    },
});

const propTypes = {
    onSetSelectSection: PropTypes.func,
}

export default createComponent({displayName: 'SweatTrainers',propTypes}, ({
                                                                              onSetSection,
    navigation
}) => {
    return (
        <VerticalLayout
            style={styles.container}
            weight={1}
        >
            <Touchable style={styles.sectionButton} onPress={() => onSetSection('INTRODUCTORY OFFERS', navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background13.jpg')}>
                    <LargeText style={styles.sectionButtonText}>INTRODUCTORY OFFERS</LargeText>
                </Image>
            </Touchable>
            <Touchable style={styles.sectionButton} onPress={() => onSetSection('SINGLE CLASSES', navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background12.jpg')}>
                    <LargeText style={styles.sectionButtonText}>SINGLE CLASSES</LargeText>
                </Image>
            </Touchable>
            <Touchable style={styles.sectionButton} onPress={() => onSetSection('SWEATPACKS', navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background13.jpg')}>
                    <LargeText style={styles.sectionButtonText}>SWEATPACKS</LargeText>
                </Image>
            </Touchable>
            <Touchable style={styles.sectionButton} onPress={() => onSetSection("30 DAY SWEATPACKS", navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background12.jpg')}>
                    {/*<LargeText style={styles.sectionButtonText}>SWEATPACKS '30 DAY' PACKS</LargeText>*/}
                    <LargeText style={styles.sectionButtonText}>30 DAY SWEATPACKS</LargeText>
                </Image>
            </Touchable>
            <Touchable style={styles.sectionButton} onPress={() => onSetSection('MEMBERSHIPS', navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background14.jpg')}>
                    <LargeText style={styles.sectionButtonText}>MEMBERSHIPS</LargeText>
                </Image>
            </Touchable>
            <Touchable style={[styles.sectionButton, {borderBottomWidth: 0}]} onPress={() => onSetSection('SHOW ALL', navigation)}>
                <Image style={styles.buttonImage} resizeMode='cover' source={require('../images/background15.jpg')}>
                    <LargeText style={styles.sectionButtonText}>SHOW ALL</LargeText>
                </Image>
            </Touchable>
        </VerticalLayout>
    )
})
