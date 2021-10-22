import createAction from "redux-actions/es/createAction";

export const setAgreeTerm = createAction('bxr/payment/SET_AGREE_TERM');
export const setPromoCode = createAction('bxr/payment/SET_PROMO_CODE');
export const setCardNumber = createAction('bxr/payment/SET_CARD_NUMBER');
export const setCardName = createAction('bxr/payment/SET_CARD_NAME');
export const setCardExpiryMonth = createAction('bxr/payment/SET_CARD_EXPIRY_MONTY');
export const setCardExpiryYear = createAction('bxr/payment/SET_CARD_EXPIRY_YEAR');
export const setSaveCard = createAction('bxr/payment/SET_SAVE_CARD');
export const setApplyPromoTotalPrice = createAction('bxr/payment/SET_ApplyPromoTotalPrice');