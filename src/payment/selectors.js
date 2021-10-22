import {createStructuredSelector} from "reselect";
import {selectedPurchaseItems} from '../purchase/selectors'
import {userCreditCard, userDetails} from "../user/userSelector";
import { GET_PAYMENT_REQUEST, GET_STORED_PRE_PAYMENT, GET_NEW_PRE_PAYMENT } from "./constants";
import {NetworkRequests} from "../RNFReact";
const {
    selectors: {
        networkRequestSucceededSelector,
        networkRequestStartedSelector,
    },
    statusConstants: {REQUEST_STARTED},
} = NetworkRequests;

const totalPriceSelector = (state) => {
    let totalPrice = 0;
    let purchaseItems = state.getIn(['purchase', 'selectedPurchaseItems'])
    purchaseItems.map((item) => {
        if(item.get('firstPaymentAmountTotal') !== undefined ) {
            totalPrice += Number(item.get('firstPaymentAmountTotal'));  // constant product
        } else{
            totalPrice += Number(item.get('price'));    // service product
        }
    });
    return totalPrice.toFixed(2);
}

export const isArgeeTermSelector = (state) => state.getIn(['payment', 'isAgreeTerm']);

export const mapStateToProps = createStructuredSelector({
    userDetails: userDetails,
    isAgreeTerm: isArgeeTermSelector,
    promoCode: (state) => state.getIn(['payment', 'promoCode']),
    selectedPurchaseItems,
    totalPrice: totalPriceSelector,
    cardInfo: (state) => state.getIn(['payment', 'cardInfo']),
    isPaying: networkRequestStartedSelector(GET_PAYMENT_REQUEST),
    paySucceeded: networkRequestSucceededSelector(GET_PAYMENT_REQUEST),
    isStoredPrePaying: networkRequestStartedSelector(GET_STORED_PRE_PAYMENT),
    isNewPrePaying: networkRequestStartedSelector(GET_NEW_PRE_PAYMENT),
    userCreditCard,
    isSaveCard: (state) => state.getIn(['payment', 'isSaveCard']),
    applyPromoTotalPrice: (state) => state.getIn(['payment', 'applyPromoTotalPrice']),
});
