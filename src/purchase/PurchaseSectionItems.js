import {Button, createComponent, Image, Platform, Row, Scrollable, StyleSheet, Touchable, VerticalLayout} from "../RNFReact";
import LargeText from "../common/text/LargeText";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import COLOR_CONSTANTS from "../colorConstants";
import PurchaseItemButton from "./PurchaseItemButton";
import immutablePropTypes from "react-immutable-proptypes";
import immutable from 'immutable'
import SubmitButton from "../common/form/SubmitButton";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_DISABLE_BACKGROUND,
    },
    buttonContainer: {
        paddingHorizontal: 15,
    },
    sectionButton: {
        height: 150,
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
    payButton: {
        borderRadius: 0,
    },
});

const propTypes = {
    introOffers: immutablePropTypes.list,
    singleClasses: immutablePropTypes.list,
    sweatPacks: immutablePropTypes.list,
    sweat30Packs: immutablePropTypes.list,
    memberShips: immutablePropTypes.list,
    selectedSection: PropTypes.string,
    onSetSection: PropTypes.func,
    onChangeSelectedPurchaseItems: PropTypes.func,
    selectedPurchaseItems: immutablePropTypes.list,
    isPayable: PropTypes.bool,
    onPayTapped: PropTypes.func,
}

const ActionButton = createComponent({displayName: 'ActionButton'}, ({
                                                                         isPayable,
                                                                         onPayTapped,
                                                                         selectedSection,
                                                                     }) => (
    isPayable ?
        <Button
            onPress={onPayTapped}
            style={styles.payButton}
        >
            {selectedSection === "MEMBERSHIPS" ? "CONTINUE" : "PAY NOW"}
        </Button> :
        null
));

export default createComponent({displayName: 'SweatTrainers', propTypes},
    class PurchaseSectionItems extends Component {

        componentWillUnmount() {
            // this.props.onSetSection('', this.props.navigation);
        }

        renderButtons() {
            const {
                introOffers,
                singleClasses,
                sweatPacks,
                sweat30Packs,
                memberShips,
                selectedSection,
                onChangeSelectedPurchaseItems,
                selectedPurchaseItems,
                navigation
            } = this.props;
            let items;
            if (selectedSection === 'INTRODUCTORY OFFERS'){
                items = introOffers;
            } else if(selectedSection === "SINGLE CLASSES"){
                items = singleClasses;
            } else if(selectedSection === "SWEATPACKS") {
                items = sweatPacks;
            } else if (selectedSection === "30 DAY SWEATPACKS") {
                items = sweat30Packs;
            } else if(selectedSection === "MEMBERSHIPS") {
                items = memberShips;
            } else if(selectedSection === "SHOW ALL") {
                // items = singleClasses.concat(sweatPacks, memberShips);
                items = immutable.List().concat(introOffers, singleClasses, sweatPacks, sweat30Packs, memberShips);
            } else {
                items = immutable.List();
            }
            return (
                <Scrollable style={styles.buttonContainer}>
                    {
                        items.map((item, index) => {
                            let fullItemName;
                            let itemName;
                            let itemDesc;
                            let itemPrice;
                            let itemId;
                            let idIndex;
                            if(item.get('firstPaymentAmountTotal') !== undefined) {     // MEMBERSHIPS
                                fullItemName = item.getIn(['contractItems', 'contractItem', 'name']).trim().replace(/ +(?= )/g, '');
                                let i = fullItemName.indexOf('(');
                                itemName = i !== -1 ? fullItemName.substring(0, i).trim() : fullItemName;
                                itemDesc = i !== -1 ? fullItemName.substring(i, fullItemName.length).trim() : '';
                                itemPrice = Number(item.get('firstPaymentAmountTotal')).toFixed(2);
                                itemId = item.get('iD');
                                idIndex = selectedPurchaseItems.findIndex(i => i.get('iD') === itemId);
                            } else {
                                fullItemName = item.get('name').trim().replace(/ +(?= )/g, '');
                                let i = fullItemName.indexOf('(');
                                itemName = i !== -1 ? fullItemName.substring(0, i).trim() : fullItemName;
                                itemDesc = i !== -1 ? fullItemName.substring(i, fullItemName.length).trim() : '';
                                itemPrice = Number(item.get('price')).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                itemId = item.get('iD');
                                idIndex = selectedPurchaseItems.findIndex(i => i.get('iD') === itemId);
                            }
                            return (
                                <PurchaseItemButton
                                    itemName={itemName}
                                    itemDesc={itemDesc}
                                    itemPrice={itemPrice}
                                    item={item}
                                    onPress={onChangeSelectedPurchaseItems}
                                    // isChecked={idIndex !== -1 }
                                    isChecked={false}
                                    key={index}
                                    navigation={navigation}
                                />
                            )
                        })
                    }
                    {/*<PurchaseItemButton itemId='sdfsdf' itemName='1* SWEAT' itemDesc='member' itemPrice='15.00' isChecked={true}/>*/}
                </Scrollable>
            )
        }

        render() {
            const {
                selectedSection,
                selectedPurchaseItems,
                onPayTapped
            } = this.props;
            let buttonImage = "";
            if (selectedSection === 'INTRODUCTORY OFFERS'){
                buttonImage = require('../images/background13.jpg');
            } else if(selectedSection === "SINGLE CLASSES"){
                buttonImage = require('../images/background12.jpg');
            } else if(selectedSection === "SWEATPACKS") {
                buttonImage = require('../images/background13.jpg');
            } else if (selectedSection === "30 DAY SWEATPACKS") {
                buttonImage = require('../images/background12.jpg');
            } else if(selectedSection === "MEMBERSHIPS") {
                buttonImage = require('../images/background14.jpg');
            } else if(selectedSection === "SHOW ALL") {
                buttonImage = require('../images/background15.jpg');
            }
            return (
                    <VerticalLayout
                        style={styles.container}
                    >
                        <VerticalLayout style={styles.sectionButton}>
                            <Image style={styles.buttonImage} resizeMode='cover' source={buttonImage}>

                                <LargeText style={styles.sectionButtonText}>{selectedSection}</LargeText>
                            </Image>
                        </VerticalLayout>
                        {this.renderButtons()}
                        <ActionButton
                            // isPayable={selectedPurchaseItems.size !== 0}
                            isPayable={false}
                            onPayTapped={onPayTapped}
                            selectedSection={selectedSection}
                        />
                    </VerticalLayout>
            )
        }
    })
