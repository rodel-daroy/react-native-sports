/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import immutable from 'immutable'
import ScreenContainer from '../common/ScreenContainer'
import {
    ActivityIndicator,
    createComponent,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import PurchaseSections from './PurchaseSections';
import PurchaseSectionItems from './PurchaseSectionItems';
import {mapStateToProps} from "./selectors";
import { eventHanders as mapDispatchToProps } from "./eventHandlers";
import {userCreditCard, userDetails} from "../user/userSelector";
import {onGetCreditCard} from "../profile/eventHandlers";

const styles = StyleSheet.create({
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})


export default createComponent({
        displayName: 'ClassPurchaseSweatScreen',
        mapStateToProps,
        mapDispatchToProps,
    },
    class PurchaseSweatScreenComponent extends Component {

        static propTypes = {
            singleClasses: immutablePropTypes.list,
            sweatPacks: immutablePropTypes.list,
            memberShips: immutablePropTypes.list,
            isGettingPurchaseItems: PropTypes.bool,
            getPurchaseItemsSucceeded: PropTypes.bool,
            onSetSection: PropTypes.func,
            selectedSection: PropTypes.string,
            onChangeSelectedPurchaseItems: PropTypes.func,
            selectedPurchaseItems: immutablePropTypes.list,
            onPayTapped: PropTypes.func,
            onGetCreditCard: PropTypes.func,
            userDetails: immutablePropTypes.map,
            userCreditCard: immutablePropTypes.map,
        };

        componentDidMount() {
            const {
                singleClasses,
                userDetails,
                userCreditCard,
                onGetPurchaseItems,
            } = this.props;
            if(singleClasses.size === 0) {
                onGetPurchaseItems();
            }
            if(userCreditCard.get('lastFour') === undefined){
                this.props.onGetCreditCard(userDetails.get('iD'));
            }
        }

        componentWillUnmount() {
            // this.props.onSetSection('', this.props.navigation);
        }

        render() {
            const {
                isGettingPurchaseItems,
                onSetSection,
                navigation,
            } = this.props;
            if(isGettingPurchaseItems){
                return (
                    <VerticalLayout
                        horizontalAlign
                        verticalAlign
                        weight={1}
                    >
                        <ActivityIndicator
                            animating
                            color={COLOR_CONSTANTS.BXR_PRIMARY}
                            size='large'
                            style={styles.loader}
                        />
                    </VerticalLayout>
                );
            }else {
                return (
                    <ScreenContainer style={styles.container}>
                        <PurchaseSections onSetSection={onSetSection} navigation={navigation}/>
                    </ScreenContainer>
                );
            }
        }
    }
)
