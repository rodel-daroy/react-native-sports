/* @flow */

import createComponent from '../../createComponent'
import {FormattedDate} from 'react-intl'
import React from 'react'
import Text from '../Text'

const propTypes = {
    ...FormattedDate.propTypes,
    ...Text.propTypes,
}

export default createComponent({displayName: 'LocalDate', injectIntl: true, propTypes}, ({
    day,
    month,
    weekday,
    year,
    value,
    ...props
}, {intl}) => {
    const dateFormatOptions = {
        day,
        month,
        weekday,
        year,
    }

    return <Text {...props}>{value ? intl.formatDate(value, dateFormatOptions) : '---'}</Text>
})
