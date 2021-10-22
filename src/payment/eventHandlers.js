import {
    setAgreeTerm,
    setPromoCode,
    setCardNumber,
    setCardName,
    setCardExpiryMonth,
    setCardExpiryYear,
    setSaveCard,
    setApplyPromoTotalPrice
} from "./actionCreators";
import {popToRootScene} from "../sceneNavigation/sceneNavigationDuck";
import {isArgeeTermSelector} from './selectors'
import {NetworkRequests} from "../RNFReact";
import {GET_PAYMENT_REQUEST, GET_NEW_PRE_PAYMENT, GET_STORED_PRE_PAYMENT} from "./constants";
import {batchActions} from "redux-batched-actions";
import apiClient from "../api/apiClient";
import {isSweatMember} from "../user/userSelector";
import {BXR_LONDON_ID, SWEAT_BY_BXR_ID} from "../location/constants";
import isErrorResponse from "../api/isErrorResponse";
import {bindActionCreators} from "redux";
const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests;


export const onSetAgreeTerm = () => async (dispatch) => {
    dispatch(setAgreeTerm());
};

export const onSetPromoCode = (value) => async (dispatch) => {
    dispatch(setPromoCode(value));
}

export const onSetCardNumber = (value) => async (dispatch) => {
    dispatch(setCardNumber(value));
};
export const onSetCardName = (value) => async (dispatch) => {
    dispatch(setCardName(value));
};
export const onSetCardExpiryDate = (value) => async (dispatch) => {
    let month = value.split('/')[0];
    let year = value.split('/')[1];
    if (year === undefined) year = "";
    dispatch(setCardExpiryMonth(month));
    dispatch(setCardExpiryYear(year));
};
export const onSetCardExpiryMonth = (value) => async (dispatch) => {
    dispatch(setCardExpiryMonth(value));
};
export const onSetCardExpiryYear = (value) => async (dispatch) => {
    dispatch(setCardExpiryYear(value));
};

export const onSetSaveCard = () => async (dispatch) => {
    dispatch(setSaveCard());
};

export const onUseStoreCard = (clientId, productId, productType, amount, promoCode, cardLastFour, navigation) => async (dispatch, getState) => {
    if(!isArgeeTermSelector(getState())){
        alert('You must agree teams and conditions.')
    } else {
        dispatch(setNetworkRequestStarted(GET_STORED_PRE_PAYMENT));
        let newAmount = amount;
        let response;
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        try {
            if (promoCode !== '') {
                if (productType === 'service') {
                    response = await apiClient.checkoutShoppingCart({
                        clientId: clientId,
                        serviceId: productId,
                        locationId: locationId,
                        promotionCode: promoCode,
                        test: true,
                        paymentCheck: true,
                        paymentInfo: {
                            type: 'StoredCardInfo',
                            values: {
                                Amount: amount,
                            },
                        }
                    });
                } else if (productType === 'contract') {
                    response = await apiClient.purchaseContracts({
                        clientId: clientId,
                        contractId: productId,
                        locationId: SWEAT_BY_BXR_ID,
                        promotionCode: promoCode,
                        test: true,
                        paymentCheck: true,
                        paymentInfo: {
                            type: 'StoredCardInfo',
                            values: {
                                Amount: amount,
                                LastFour: cardLastFour,
                            },
                        }
                    });
                }
                console.warn('a1a2', response);
                if (isErrorResponse(response)){
                    alert(response.getIn(['response', 'message']));
                    dispatch(setNetworkRequestFailed(GET_STORED_PRE_PAYMENT));
                    return;
                }
                newAmount = response.getIn(['response', 'shoppingCart', 'grandTotal'])
            }
            dispatch(setApplyPromoTotalPrice(newAmount));
            dispatch(batchActions([
                setNetworkRequestSucceeded(GET_STORED_PRE_PAYMENT),
                navigation.push('useStoredCardScreen')
            ]));
        }catch(e) {
            dispatch(setNetworkRequestFailed(GET_STORED_PRE_PAYMENT));
        }
    }
};

export const onEnterNewCard = (clientId, productId, productType, amount, promoCode, navigation) => async (dispatch, getState) => {

    let cartNumber = "123", expYear = '2019', expMonth = '01', name = 'test', address = 'test',
        city = 'test', state = 'test', postalcode = '123123', isSaveCard = true;
    if(!isArgeeTermSelector(getState())){
        alert('You must agree teams and conditions.')
    }else {
        dispatch(setNetworkRequestStarted(GET_NEW_PRE_PAYMENT));
        let newAmount = amount;
        let response;
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        try {
            if (promoCode !== '') {
                if(productType === 'service') {
                    response = await apiClient.checkoutShoppingCart({
                        clientId: clientId,
                        serviceId: productId,
                        locationId: locationId,
                        promotionCode: promoCode,
                        test: true,
                        paymentCheck: true,
                        paymentInfo: {
                            type: 'CreditCardInfo',
                            values: {
                                Amount: amount,
                                CreditCardNumber: cartNumber,
                                ExpYear: expYear,
                                ExpMonth: expMonth,
                                BillingName: name,
                                BillingAddress: address,
                                BillingCity: city,
                                BillingState: state,
                                BillingPostalCode: postalcode,
                                SaveInfo: isSaveCard,
                            },
                        }
                    });
                } else if(productType === 'contract') {
                    response = await apiClient.purchaseContracts({
                        clientId: clientId,
                        contractId: productId,
                        locationId: SWEAT_BY_BXR_ID,
                        promotionCode: promoCode,
                        test: true,
                        paymentCheck: true,
                        paymentInfo: {
                            type: 'CreditCardInfo',
                            values: {
                                Amount: amount,
                                CreditCardNumber: cartNumber,
                                ExpYear: expYear,
                                ExpMonth: expMonth,
                                BillingName: name,
                                BillingAddress: address,
                                BillingCity: city,
                                BillingState: state,
                                BillingPostalCode: postalcode,
                                SaveInfo: isSaveCard,
                            },
                        }
                    });
                }
                if (isErrorResponse(response)){
                    alert(response.getIn(['response', 'message']));
                    dispatch(setNetworkRequestFailed(GET_NEW_PRE_PAYMENT));
                    return;
                }
                newAmount = response.getIn(['response', 'shoppingCart', 'grandTotal'])
            }
            dispatch(setApplyPromoTotalPrice(newAmount));
            dispatch(batchActions([
                setNetworkRequestSucceeded(GET_NEW_PRE_PAYMENT),
                navigation.push('enterNewCardScreen')
            ]));
        }catch(e) {
            dispatch(setNetworkRequestFailed(GET_NEW_PRE_PAYMENT));
        }
    }
};

export const onPayStoredCard = (clientId, productId, productType, amount, promoCode, cardLastFour, navigation) => async (dispatch, getState) => {
    dispatch(setNetworkRequestStarted(GET_PAYMENT_REQUEST));
    try{
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        let response;
        if(productType === 'service') {
            response = await apiClient.checkoutShoppingCart({
                clientId: clientId,
                serviceId: productId,
                locationId: locationId,
                promotionCode: promoCode,
                paymentInfo: {
                    type: 'StoredCardInfo',
                    values: {
                        Amount: amount,
                    },
                }
            });
        } else if(productType === 'contract') {
            response = await apiClient.purchaseContracts({
                clientId: clientId,
                contractId: productId,
                locationId: SWEAT_BY_BXR_ID,
                promotionCode: promoCode,
                paymentInfo: {
                    type: 'StoredCardInfo',
                    values: {
                        Amount: amount,
                        LastFour: cardLastFour,
                    },
                }
            });
        } else {
            throw {};
        }
        if (isErrorResponse(response)){
            alert(response.getIn(['response', 'message']));
            dispatch(setNetworkRequestFailed(GET_PAYMENT_REQUEST));
            return;
        }
        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_PAYMENT_REQUEST),
            navigation.push('paymentCompleteScreen')
        ]));
    }catch (e) {
        dispatch(setNetworkRequestFailed(GET_PAYMENT_REQUEST));
    }
};
export const onPayNewCard = (clientId, productId, productType, amount, promoCode, cartNumber, expYear, expMonth, name, address, city, state, postalcode, isSaveCard, navigation) => async (dispatch, getState) => {
    try{
        let now = new Date();
        if(expYear == '' || expMonth == '' || expMonth < 1 || expMonth > 12){
            alert("Incorrect expiry date. Please check and try again.");
            return;
        }
        if((now.getFullYear() > Number(expYear)) || (now.getFullYear() === Number(expYear) && now.getMonth() + 1 > Number(expMonth))){
            alert("Incorrect expiry date. Please check and try again.");
            return;
        }
        dispatch(setNetworkRequestStarted(GET_PAYMENT_REQUEST));
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        let response;
        if(productType === 'service') {
            response = await apiClient.checkoutShoppingCart({
                clientId: clientId,
                serviceId: productId,
                locationId: locationId,
                promotionCode: promoCode,
                paymentInfo: {
                    type: 'CreditCardInfo',
                    values: {
                        Amount: amount,
                        CreditCardNumber: cartNumber,
                        ExpYear: expYear,
                        ExpMonth: expMonth,
                        BillingName: name,
                        BillingAddress: address,
                        BillingCity: city,
                        BillingState: state,
                        BillingPostalCode: postalcode,
                        SaveInfo: isSaveCard,
                    },
                }
            });
        } else if(productType === 'contract') {
            response = await apiClient.purchaseContracts({
                clientId: clientId,
                contractId: productId,
                locationId: SWEAT_BY_BXR_ID,
                promotionCode: promoCode,
                paymentInfo: {
                    type: 'CreditCardInfo',
                    values: {
                        Amount: amount,
                        CreditCardNumber: cartNumber,
                        ExpYear: expYear,
                        ExpMonth: expMonth,
                        BillingName: name,
                        BillingAddress: address,
                        BillingCity: city,
                        BillingState: state,
                        BillingPostalCode: postalcode,
                        SaveInfo: isSaveCard,
                    },
                }
            });
        } else {
            throw {};
        }
        if (isErrorResponse(response)){
            let errorMessage = response.getIn(['response', 'message']);
            alert("Incorrect card information. Please check and try again.");
            dispatch(setNetworkRequestFailed(GET_PAYMENT_REQUEST));
            return;
        }
        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_PAYMENT_REQUEST),
            navigation.push('paymentCompleteScreen')
        ]));
    }catch (e) {
        dispatch(setNetworkRequestFailed(GET_PAYMENT_REQUEST));
    }
};

export const onReturnBookSession = (navigation) => async (dispatch) => {
    dispatch(batchActions([
        navigation.popToTop()
    ]));
};

export const onPaymentDone = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.popToTop()]))
};

export const eventHanders = (dispatch) => bindActionCreators({
    onSetAgreeTerm,
    onSetPromoCode,
    onSetCardNumber,
    onSetCardName,
    onSetCardExpiryDate,
    onSetCardExpiryMonth,
    onSetCardExpiryYear,
    onUseStoreCard,
    onEnterNewCard,
    onPayStoredCard,
    onPayNewCard,
    onReturnBookSession,
    onPaymentDone,
}, dispatch);
