/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import COLOR_CONSTANTS from '../colorConstants'
import {getMonthDayYear} from '../timeAndDateUtil'
import HeaderText from '../common/text/HeaderText'
import immutablePropTypes from 'react-immutable-proptypes'
import {mapStateToProps} from '../user/userSelector'
import numeral from 'numeral'
import SmallText from '../common/text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    Scrollable,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as mapDispatchToProps from '../profile/eventHandlers'

const styles = StyleSheet.create({
    textValue: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        marginTop: 10,
        marginBottom: 10,
    },
    label: {
        marginTop: 10,
    },
    name: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
    },
    accountBalance: {
        marginTop: 30,
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 25,
    },
})

export default createComponent({
    displayName: 'ProfileMembership',
    mapStateToProps,
    mapDispatchToProps,
}, class ProfileMemberships extends Component {
    static propTypes = {
        getUserAccountBalances: PropTypes.func,
        getUserMemberships: PropTypes.func,
        isGettingAccountBalance: PropTypes.bool,
        isGettingMembership: PropTypes.bool,
        titleText: PropTypes.string,
        userDetails: immutablePropTypes.map,
        userMembership: immutablePropTypes.map,
    }

    componentDidMount() {
        const userId = this.props.userDetails ? this.props.userDetails.get('iD') : null

        if (userId) {
            this.props.getUserMemberships(userId)
            this.props.getUserAccountBalances(userId)
        }
    }

    render() { // eslint-disable-line complexity
        const {
            isGettingAccountBalance,
            isGettingMembership,
            titleText,
            userMembership,
            userDetails,
            navigation
        } = this.props

        const accountBalance = userDetails.get('accountBalance') ?
            numeral(userDetails.get('accountBalance')).format('0.00') :
            '0.00'
        const activeDate = getMonthDayYear(userMembership.get('activeDate')) || 'N/A'
        const expirationDate = getMonthDayYear(userMembership.get('expirationDate')) || 'N/A'
        const name = userMembership.get('name') || 'NON-MEMBER'

        return (
            <BackgroundImageContainer
                backgroundIndex={10}
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <Scrollable>
                    <VerticalLayout
                        style={styles.container}
                        weight={1}
                    >
                        {
                            isGettingMembership || isGettingAccountBalance ?
                                <VerticalLayout
                                    style={styles.container}
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
                                <VerticalLayout
                                    verticalAlign
                                >
                                    <HeaderText style={styles.label}>membership type</HeaderText>
                                    <SmallText style={styles.textValue}>{name}</SmallText>
                                    <HeaderText style={styles.label}>activation date</HeaderText>
                                    <SmallText style={styles.textValue}>{activeDate}</SmallText>
                                    <HeaderText style={styles.label}>expiration date</HeaderText>
                                    <SmallText style={styles.textValue}>{expirationDate}</SmallText>
                                    <HeaderText style={styles.label}>account balance</HeaderText>
                                    <SmallText style={styles.textValue}>£ {accountBalance}</SmallText>
                                </VerticalLayout>
                        }
                    </VerticalLayout>
                </Scrollable>
            </BackgroundImageContainer>
        )
    }
})
