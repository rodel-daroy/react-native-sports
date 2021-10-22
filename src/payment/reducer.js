import {handleActions} from 'redux-actions'
import R from "ramda";
import immutable from "immutable";
import {
    setAgreeTerm,
    setPromoCode,
    setCardNumber,
    setCardName,
    setCardExpiryMonth,
    setCardExpiryYear,
    setSaveCard,
    setApplyPromoTotalPrice
} from './actionCreators'

const getInitialState = R.always(immutable.fromJS({
    isAgreeTerm: false,
    promoCode: '',
    cardInfo: {
        number: '',
        name: '',
        expiryMonth: '',
        expiryYear: '',
    },
    applyPromoTotalPrice: 0,
}));

const setStateProperty = (propertyName: string) => (state: any, {payload: value}: any) => state.set(propertyName, value);

const handleSetAgreeTerm = (state, {payload}) => {
    let isAgreeTerm = state.get('isAgreeTerm');
    return state.set('isAgreeTerm', !isAgreeTerm);
};

const handleSetCardInfo = (infoName) => (state, {payload}) =>
    state.setIn(['cardInfo', infoName], payload);

const handleSetSaveCard = (state, {payload}) => {
    let isSaveCard = state.get('isSaveCard');
    return state.set('isSaveCard', !isSaveCard);
};

export default handleActions({
    [setAgreeTerm]: handleSetAgreeTerm,
    [setPromoCode]: setStateProperty('promoCode'),
    [setCardNumber]: handleSetCardInfo('number'),
    [setCardName]: handleSetCardInfo('name'),
    [setCardExpiryMonth]: handleSetCardInfo('expiryMonth'),
    [setCardExpiryYear]: handleSetCardInfo('expiryYear'),
    [setSaveCard]: handleSetSaveCard,
    [setApplyPromoTotalPrice]: setStateProperty('applyPromoTotalPrice'),
}, getInitialState())