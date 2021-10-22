/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import colorConstants from '../colorConstants'
import HeaderText from '../common/text/HeaderText'
import isSmallScreen from '../common/isSmallScreen'
import SmallText from '../common/text/SmallText'
import {
    createComponent,
    Email,
    Platform,
    Scrollable,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    headerText: {
        paddingLeft: 8,
    },
    description: {
        color: colorConstants.BXR_TEXT,
        ...Platform.select({
            ios: {
                lineHeight: isSmallScreen() ? 20 : 25,
            },
            web: {
                lineHeight: '25px',
            },
        }),
        paddingLeft: 8,
    },
    container: {
        padding: 10,
    },
    childrenContainer: {
        position: 'absolute',
    },
    link: {
        fontWeight: 'bold',
        color: colorConstants.BXR_PRIMARY,
    },
    email: {
        padding: 0,
    },
})


const MAIN_CONTENT =
`
£1800 per annum OR £180 per month (minimum 12-month commitment).
£180 joining fee.
Complimentary classes on the Members' Floor.
A pack of 12 SWEAT by BXR classes (expiry 6 months).
Member rates on additional SWEAT classes.
6 complimentary Guest Day Passes.
10% discount in the BXR Clinic.
`

const LINK_CONTENT =
`
For information on Corporate, International or Lifetime Membership please contact:
`
const Content = ({
    header,
    description,
    weight,
}) => (
    <VerticalLayout weight={weight}>
        <HeaderText style={styles.headerText}>{header}</HeaderText>
        <SmallText style={styles.description}>
            {description}
        </SmallText>
    </VerticalLayout>
)

Content.propTypes = {
    description: PropTypes.string,
    header: PropTypes.string,
    weight: PropTypes.number,
}

export default createComponent({displayName: 'MembershipScreen'}, () => (
    <BackgroundImageContainer
        backgroundIndex={9}
        childrenContainerStyle={styles.childrenContainer}
        withTabBar
    >
        <Scrollable>
            <VerticalLayout
                style={styles.container}
            >
                <HeaderText style={styles.headerText}>ANNUAL MEMBERSHIP</HeaderText>
                <SmallText style={styles.description}>
                    {MAIN_CONTENT}
                </SmallText>
                <SmallText style={styles.description}>{LINK_CONTENT}</SmallText>
                <Email
                    isIconVisible={false}
                    style={styles.email}
                >
                    <SmallText style={styles.link}>membership@bxrlondon.com</SmallText>
                </Email>
            </VerticalLayout>
        </Scrollable>
    </BackgroundImageContainer>
))
