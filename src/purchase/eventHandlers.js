import apiClient from "../api/apiClient";
import isErrorResponse from "../api/isErrorResponse";
import immutable from "immutable";
import {NetworkRequests} from "../RNFReact";
import {batchActions} from "redux-batched-actions";
import {
    setIntroOffers,
    setSingleClasses,
    setSweatPacks,
    setSweat30Packs,
    setMemberShips,
    setSection,
    changeSelectedPurchaseItems,
} from './actionCreators'
import {
    GET_PURCHASE_ITEMS,
} from './constants'
import {bindActionCreators} from "redux";
import {onGetCreditCard} from "../profile/eventHandlers";

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests;

const onGetIntroOffers = async () => {
    let programIds = [ 38, 39, 40 ];
    const response = await apiClient.getServices({
        locationId: "1",
        hideRelatedPrograms: true,
        sellOnline: true,
        programIds: programIds
    });

    if (isErrorResponse(response)) {
        throw response
    }
    return response.getIn(['response', 'services', 'service'], []);
};

const onGetSingleClasses = async () => {
    // let programIds = [ 23 ];
    let programIds = [ 43, 42 ];
    const response = await apiClient.getServices({
        locationId: "1",
        hideRelatedPrograms: true,
        sellOnline: true,
        programIds: programIds
    });

    if (isErrorResponse(response)) {
        throw response
    }
    return response.getIn(['response', 'services', 'service'], []).filter((v) => {
        return (
            (v.get('name').trim().indexOf('Sweat (Member)') !== -1) ||
            (v.get('name').trim().indexOf('Sweat (Non-Member') !== -1) ||
            (v.get('name').trim().indexOf('1 Lunch Sweat') !== -1) ||
            (v.get('name').trim().indexOf('Sweat then Sweat Again') !== -1)
        );
    });
};

const onGetSweatPacks = async () => {
    // let programIds = [ 25 ];
    let programIds = [ 43, 42 ];
    const response = await apiClient.getServices({
        locationId: "1",
        hideRelatedPrograms: true,
        sellOnline: true,
        programIds: programIds
    });

    if (isErrorResponse(response)) {
        throw response
    }

    return response.getIn(['response', 'services', 'service'], []).filter((v) => {
        return (
            (v.get('iD') !== "51811") &&
            (v.get('iD') !== "51812") &&
            (v.get('iD') !== "51809") &&
            (v.get('iD') !== "51846")
        );
    });
};

const onGetSweat30Packs = async () => {
    let programIds = [ 45 ];
    const response = await apiClient.getServices({
        locationId: "1",
        hideRelatedPrograms: true,
        sellOnline: true,
        programIds: programIds
    });

    if (isErrorResponse(response)) {
        throw response
    }

    return response.getIn(['response', 'services', 'service'], []);
};

const onGetMemberShips = async () => {
    const response = await apiClient.getContracts({
        contractIds: [],
        locationId: "2",
    });

    if (isErrorResponse(response)) {
        throw response
    }
    const memberShips = response.getIn(['response', 'contracts', 'contract'], immutable.List());
    return immutable.List.isList(memberShips) ? memberShips : immutable.List([memberShips]);
};

export const onGetPurchaseItems = () => async (dispatch) => {
    dispatch(setNetworkRequestStarted(GET_PURCHASE_ITEMS))
    Promise.all([
        onGetIntroOffers(),
        onGetSingleClasses(),
        onGetSweatPacks(),
        onGetSweat30Packs(),
        onGetMemberShips()
    ]).then(([
                            introOffers,
                            singleClasses,
                            sweatPacks,
                            sweat30Packs,
                            memberShips
                        ]) => {
        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_PURCHASE_ITEMS),
            setIntroOffers(introOffers),
            setSingleClasses(singleClasses),
            setSweatPacks(sweatPacks),
            setSweat30Packs(sweat30Packs),
            setMemberShips(memberShips)
        ]))
    }).catch(e => {
        dispatch(setNetworkRequestFailed(GET_PURCHASE_ITEMS))
    });
};

export const onSetSection = (section, navigation) => async (dispatch) => {
    dispatch(setSection(section));
    if(section !== ''){
        dispatch(batchActions([navigation.push('purchaseItemsScreen')]));
    }
}

export const onChangeSelectedPurchaseItems = (item, navigation) => async (dispatch) => {
    dispatch(changeSelectedPurchaseItems(item));
    dispatch(batchActions([navigation.push('paymentTotal')]));
}

export const onPayTapped = (navigation) => (dispatch) => {
    dispatch(batchActions([navigation.push('paymentTotal')]));
}

export const eventHanders = (dispatch) => bindActionCreators({
    onGetPurchaseItems,
    onSetSection,
    onChangeSelectedPurchaseItems,
    onPayTapped,
    onGetCreditCard,
}, dispatch);
