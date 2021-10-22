import {createComponent, Row, Scrollable, StyleSheet, TextInput, Touchable, Button, VerticalLayout} from "../RNFReact";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Linking} from 'react-native';
import InputField from './InputField';
import ScreenContainer from "../common/ScreenContainer";
import PurchaseItemButton from "../purchase/PurchaseItemButton";
import COLOR_CONSTANTS from "../colorConstants";
import MediumText from "../common/text/MediumText";
import SmallText from "../common/text/SmallText";
import {mapStateToProps} from "../payment/selectors";
import * as mapDispatchToProps from "../payment/eventHandlers";
import immutablePropTypes from "react-immutable-proptypes";
import ActionButton from './ActionButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {userCreditCard} from "../user/userSelector";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_PURCHASE_BACKGROUND,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    descText: {
        paddingVertical: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: 'black',
    },
    promoContainer: {
        marginTop: 30,
    },
    promoTextInput: {
        flex: 1,
        height: 50,
        marginTop: 30,
        marginHorizontal: -7,
        paddingHorizontal: 20,
        fontSize: 17,
        color: 'white',
        backgroundColor: 'black'
    },
    radioIcon: {
        paddingRight: 10,
        fontSize: 23,
        color: 'white',
    },
    radioText: {
        flex: 1,
    },
    termText: {
        color: COLOR_CONSTANTS.BXR_PRIMARY
    },
    actionButton: {
        marginTop: 1,
        borderRadius: 0,
    },
});

export default createComponent({
        displayName: 'ClassPaymentTotalScreen',
        mapStateToProps,
        mapDispatchToProps,
    },
    class PurchaseSweatScreenComponent extends Component {
        static propTypes = {
            onSetPromoCode: PropTypes.func,
            promoCode: PropTypes.string,
            onSetAgreeTerm: PropTypes.func,
            isAgreeTerm: PropTypes.bool,
            onUseStoreCard: PropTypes.func,
            onEnterNewCard: PropTypes.func,
            selectedPurchaseItems: immutablePropTypes.list,
            userCreditCard: immutablePropTypes.map,
        };

        componentWillUnmount() {
            this.props.onSetPromoCode('');
        }

        openTermLink() {
            Linking.openURL('https://bxrlondon.com/sweat-terms.html');
        }

        renderDescText() {
            const {
                selectedPurchaseItems,
            } = this.props;
            let item = selectedPurchaseItems.get(0);
            if(item.get('firstPaymentAmountTotal') !== undefined){
                let descStr = item.get('agreementTerms').replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/gi, ' ').trim();
                return(
                    <SmallText style={styles.descText}>
                        {descStr}
                    </SmallText>
                );
            } else{
                return null;
            }
        }

        renderPurchaseItems() {
            const {
                selectedPurchaseItems,
            } = this.props;

            return (
                <VerticalLayout>
                    {
                        selectedPurchaseItems.map((item) => {
                            let fullItemName;
                            let itemName;
                            let itemDesc;
                            let itemPrice;
                            let itemId;
                            let idIndex;
                            if(item.get('firstPaymentAmountTotal') !== undefined) { //MEMBERSHIPS
                                fullItemName = item.getIn(['contractItems', 'contractItem', 'name']).trim().replace(/ +(?= )/g, '');
                                let i = fullItemName.indexOf('(');
                                itemName = i !== -1 ? fullItemName.substring(0, i).trim() : fullItemName;
                                itemDesc = i !== -1 ? fullItemName.substring(i, fullItemName.length).trim() : '';
                                itemPrice = Number(item.get('firstPaymentAmountTotal')).toFixed(2);
                                itemId = item.get('iD');
                            } else {
                                fullItemName = item.get('name').trim().replace(/ +(?= )/g, '');
                                let i = fullItemName.indexOf('(');
                                itemName = i !== -1 ? fullItemName.substring(0, i).trim() : fullItemName;
                                itemDesc = i !== -1 ? fullItemName.substring(i, fullItemName.length).trim() : '';
                                itemPrice = Number(item.get('price')).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                itemId = item.get('iD');
                            }
                            return (
                                <PurchaseItemButton
                                    itemName={itemName}
                                    itemDesc={itemDesc}
                                    itemPrice={itemPrice}
                                    key={itemId}
                                />
                            )
                        })
                    }
                </VerticalLayout>
            )
        }

        render() {
            const {
                userDetails,
                onSetPromoCode,
                promoCode,
                onSetAgreeTerm,
                isAgreeTerm,
                isStoredPrePaying,
                isNewPrePaying,
                onUseStoreCard,
                onEnterNewCard,
                selectedPurchaseItems,
                totalPrice,
                userCreditCard,
                navigation,
            } = this.props;
            let isShowStoredCard = true;
            if(userCreditCard.get('lastFour') === undefined || userCreditCard.get('lastFour') === ''){
                isShowStoredCard = false;
            }

            let productId = selectedPurchaseItems.get(0).get('iD');
            let lastFour = userCreditCard.get('lastFour');
            let cardType = userCreditCard.get('cardType') === undefined ? "VISA" : userCreditCard.get('cardType');
            let productType;
            if(selectedPurchaseItems.get(0).get('firstPaymentAmountTotal') !== undefined) {
                productType = "contract";
            } else {
                productType = "service";
            }

            return (
                <ScreenContainer style={styles.container}>
                    <VerticalLayout
                        style={styles.contentContainer}
                    >
                        <Scrollable>
                            { this.renderDescText() }
                            {this.renderPurchaseItems()}
                            <Row style={styles.totalContainer}>
                                <MediumText numberOfLines={1}>TOTAL</MediumText>
                                <MediumText>£{totalPrice}</MediumText>
                            </Row>
                            <Row style={styles.promoContainer}>
                                <InputField
                                    value={promoCode}
                                    placeholder={'GOT A PROMO CODE? ENTER HERE'}
                                    onValueChange={(text) => onSetPromoCode(text)}
                                />
                            </Row>
                            <Touchable onPress={() => onSetAgreeTerm()}>
                                <Row>
                                    <MaterialIcons style={styles.radioIcon}
                                          name={isAgreeTerm ? 'radio-button-checked' : 'radio-button-unchecked'}/>
                                    <SmallText style={styles.radioText}>I agree with terms and conditions (
                                        <SmallText style={styles.termText} onPress={this.openTermLink}> view terms and conditions </SmallText>
                                        )
                                    </SmallText>
                                </Row>
                            </Touchable>
                        </Scrollable>
                    </VerticalLayout>
                    {
                        isShowStoredCard ?
                            <ActionButton
                                isEnable={isAgreeTerm}
                                isLoading={isStoredPrePaying}
                                buttonText='USE STORED CARD'
                                onPress={() => onUseStoreCard(userDetails.get('iD'), productId, productType, totalPrice, promoCode, lastFour, navigation)}
                            /> : null
                    }
                    <ActionButton
                        isEnable={isAgreeTerm}
                        isLoading={isNewPrePaying}
                        buttonText='ENTER NEW CARD'
                        onPress={() => onEnterNewCard(userDetails.get('iD'), productId, productType, totalPrice, promoCode, navigation)}
                    />
                </ScreenContainer>
            );
        }
    }
)
