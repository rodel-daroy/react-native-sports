import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {
    setIntroOffers,
    setSingleClasses,
    setSweatPacks,
    setSweat30Packs,
    setMemberShips,
    setSection,
    changeSelectedPurchaseItems,
} from './actionCreators'
import R from "ramda";

const getInitialState = R.always(immutable.fromJS({
    introOffers: [],
    singleClasses: [],
    sweatPacks: [],
    sweat30Packs: [],
    memberShips: [],
    selectedSection: '',
    selectedPurchaseItems: [],
}))

const setStateProperty = (propertyName: string) => (state: any, {payload: value}: any) => state.set(propertyName, value)

// const handleSetPurchaseItems = (state, {payload}) => {
//     return state.set('purchaseItems', payload);
// };
//
const handleSetSelectSection = (state, {payload}) => {
    state = state.set('selectedSection', payload);
    return state.set('selectedPurchaseItems', immutable.List());
}

const handleChangeSelectedPurchaseItems = (state, {payload}) => {
    /*
    let nowSelectedPurchaseItems = state.get('selectedPurchaseItems');
    let i = nowSelectedPurchaseItems.findIndex(i => i.get('iD') === payload.get('iD'));
    if( i === -1) {
        nowSelectedPurchaseItems = nowSelectedPurchaseItems.push(payload);
    } else {
        nowSelectedPurchaseItems = nowSelectedPurchaseItems.delete(i);
    }
    return state.set('selectedPurchaseItems', nowSelectedPurchaseItems);
    */
    let items = immutable.List();
    return state.set('selectedPurchaseItems', items.push(payload));
}

export default handleActions({
    [setIntroOffers]: setStateProperty('introOffers'),
    [setSingleClasses]: setStateProperty('singleClasses'),
    [setSweatPacks]: setStateProperty('sweatPacks'),
    [setSweat30Packs]: setStateProperty('sweat30Packs'),
    [setMemberShips]: setStateProperty('memberShips'),
    [setSection]: handleSetSelectSection,
    [changeSelectedPurchaseItems]: handleChangeSelectedPurchaseItems
}, getInitialState())
