import {NetworkRequests} from "../RNFReact";
import {createStructuredSelector} from "reselect";
import {GET_PURCHASE_ITEMS} from "./constants";
import {userDetails, userCreditCard} from "../user/userSelector";

const {
    selectors: {
        networkRequestSucceededSelector,
        networkRequestStartedSelector,
    },
    statusConstants: {REQUEST_STARTED},
} = NetworkRequests;

export const selectedSection = (state) => state.getIn(['purchase', 'selectedSection']);

export const selectedPurchaseItems = (state) => state.getIn(['purchase', 'selectedPurchaseItems']);


export const mapStateToProps = createStructuredSelector({
    introOffers: (state) => state.getIn(['purchase', 'introOffers']),
    singleClasses: (state) => state.getIn(['purchase', 'singleClasses']),
    sweatPacks: (state) => state.getIn(['purchase', 'sweatPacks']),
    sweat30Packs: (state) => state.getIn(['purchase', 'sweat30Packs']),
    memberShips: (state) => state.getIn(['purchase', 'memberShips']),
    isGettingPurchaseItems: networkRequestStartedSelector(GET_PURCHASE_ITEMS),
    getPurchaseItemsSucceeded: networkRequestSucceededSelector(GET_PURCHASE_ITEMS),
    selectedSection,
    selectedPurchaseItems,
    userDetails,
    userCreditCard,
})
