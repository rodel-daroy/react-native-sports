/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import getWeekCoverage from './getWeekCoverage'
import React from 'react'
import SmallText from '../common/text/SmallText'
import {
    createComponent,
    HorizontalLayout,
    Icon,
    StyleSheet,
    Touchable,
} from '../RNFReact'

const styles = StyleSheet.create({
    dateCoverage: {
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
        padding: 10,
        paddingBottom: 5,
    },
    text: {
        marginHorizontal: 20,
    },
})

export default createComponent({displayName: 'WeekFilterCoverage'}, ({
    onDateCoverageChange,
    disabled,
    weeksFromNow,
}) => (
    <HorizontalLayout
        horizontalAlign
        style={styles.dateCoverage}
        verticalAlign
    >
        <Touchable
            disabled={disabled || weeksFromNow === 0}
            onPress={() => onDateCoverageChange(weeksFromNow - 1)}
        >
            <Icon
                color={weeksFromNow === 0 ? COLOR_CONSTANTS.BXR_SECONDARY : COLOR_CONSTANTS.BXR_PRIMARY}
                name='chevron-left'
                size={18}
            />
        </Touchable>
        <SmallText style={styles.text}>{getWeekCoverage(weeksFromNow)}</SmallText>
        <Touchable
            disabled={disabled}
            onPress={() => onDateCoverageChange(weeksFromNow + 1)}
        >
            <Icon
                name='chevron-right'
                size={18}
            />
        </Touchable>
    </HorizontalLayout>
))
