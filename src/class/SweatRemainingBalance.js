/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import React from 'react'
import SmallText from '../common/text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'

const styles = StyleSheet.create({
    remainingServiceContainer: {
        backgroundColor: 'rgb(50,50,50)',
    },
    errorText: {
        fontWeight: 'bold',
        margin: 10,
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
    },
    loader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})

export default createComponent({displayName: 'SweatRemainingBalance'}, ({
    isGettingSweatBalance,
    sweatBalance,
    style,
}) => (
    <VerticalLayout
        horizontalAlign
        style={[styles.remainingServiceContainer, style]}
        verticalAlign
    >
        {isGettingSweatBalance ?
            <ActivityIndicator
                animating
                color={COLOR_CONSTANTS.BXR_PRIMARY}
                size='small'
                style={styles.loader}
            /> :
            <SmallText style={styles.errorText}>
                {`You have ${sweatBalance} remaining SWEAT credits`}
            </SmallText>
        }

    </VerticalLayout>
))
