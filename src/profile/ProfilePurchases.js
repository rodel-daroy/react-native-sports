/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import {getMonthDayYear} from '../timeAndDateUtil'
import HeaderText from '../common/text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import ListContent from '../common/ListContent'
import {mapStateToProps} from '../user/userSelector'
import numeral from 'numeral'
import ScreenContainer from '../common/ScreenContainer'
import SmallText from '../common/text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    HorizontalLayout,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from '../profile/eventHandlers'

const styles = StyleSheet.create({
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    list: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    rowItem: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(210, 210, 210)',
        flex: 1,
    },
    label: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    textValue: {
        color: 'rgb(100, 100, 100)',
    },
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
})

const PROFILE_PURCHASES_EMPTY_LIST = 'You dont have any purchases for now.';
const PROFILE_PURCHASES_FAILED_MESSAGE = 'We were unable to display your purchases at this time. Please check your connection and try again.' // eslint-disable-line max-len

const PurchaseRow = createComponent({displayName: 'PurchaseRow'}, ({
    name,
    amount,
    quantity,
    datePaid,
}) => {
    const amountString = amount ?
        numeral(amount).format('0.00') :
        '0.00'

    return (
        <VerticalLayout style={styles.rowItem}>
            <HeaderText>{name}</HeaderText>
            <HorizontalLayout>
                <SmallText style={styles.label}>Amount: </SmallText>
                <SmallText style={styles.textValue}>£ {amountString}</SmallText>
            </HorizontalLayout>
            <HorizontalLayout>
                <SmallText style={styles.label}>Quantity: </SmallText>
                <SmallText style={styles.textValue}>{quantity}</SmallText>
            </HorizontalLayout>
            <HorizontalLayout>
                <SmallText style={styles.label}>Date Paid: </SmallText>
                <SmallText style={styles.textValue}>{getMonthDayYear(datePaid)}</SmallText>
            </HorizontalLayout>
        </VerticalLayout>
    )
})

export default createComponent({
    displayName: 'ProfilePurchases',
    mapStateToProps,
    mapDispatchToProps,
}, class ProfileMemberships extends Component {
    static propTypes = {
        getPurchasesSuccess: PropTypes.bool,
        getUserPurchases: PropTypes.func,
        isGettingPurchases: PropTypes.bool,
        titleText: PropTypes.string,
        userDetails: immutablePropTypes.map,
        userPurchases: immutablePropTypes.map,
    }

    componentDidMount() {
        const userId = this.props.userDetails ? this.props.userDetails.get('iD') : null

        if (userId) {
            this.props.getUserPurchases(userId)
        }
    }

    render() {
        const {
            getPurchasesSuccess,
            getUserPurchases,
            isGettingPurchases,
            userPurchases,
            userDetails,
            titleText,
            navigation
        } = this.props

        return (
            <ScreenContainer
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <VerticalLayout
                    style={styles.container}
                    weight={1}
                >
                    {
                        isGettingPurchases ?
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
                            </VerticalLayout> :
                            <ListContent
                                emptyListMessage={PROFILE_PURCHASES_EMPTY_LIST}
                                failedFetchMessage={PROFILE_PURCHASES_FAILED_MESSAGE}
                                fetchSuccess={getPurchasesSuccess}
                                listData={userPurchases}
                                onRefreshList={() => getUserPurchases(userDetails.get('iD'))}
                                renderRow={({item}) =>
                                    <PurchaseRow
                                        amount={item.get('amountPaid')}
                                        datePaid={item.getIn(['sale', 'saleDate'])}
                                        name={item.get('description')}
                                        quantity={item.getIn(['quantity'])}
                                    />
                                }
                            />
                    }
                </VerticalLayout>
            </ScreenContainer>
        )
    }
})
