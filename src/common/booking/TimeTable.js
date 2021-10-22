/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import moment from 'moment'
import React from 'react'
import SmallText from '../text/SmallText'
import {
    createComponent,
    StyleSheet,
    VerticalLayout,
} from '../../RNFReact'

const styles = StyleSheet.create({
    textContainer: {
        height: 60,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
        borderStyle: 'solid',
        borderColor: 'rgb(210, 210, 210)',
    },
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        textAlign: 'center',
    },
})

const timeTableList = (timeTable) => timeTable.map((currentTimeSchedule, index) => {
    const dateTimeString = moment(currentTimeSchedule).format('HH:mm') // eslint-disable-line moment-utc/no-moment-without-utc

    return (
        <VerticalLayout
            key={index}
            style={styles.textContainer}
            verticalAlign
        >
            <SmallText style={styles.text}>{dateTimeString}</SmallText>
        </VerticalLayout>
    )
})

export default createComponent({
    displayName: 'TimeTable',
}, ({
    timeTable = [],
}) => (
    <VerticalLayout>
        {timeTableList(timeTable)}
    </VerticalLayout>
))
