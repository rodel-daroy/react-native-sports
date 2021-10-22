/* @flow */

import createComponent from '../../createComponent'
import {FormattedNumber} from 'react-intl'
import React from 'react'
import Text from '../Text'

const propTypes = {
    ...FormattedNumber.propTypes,
    ...Text.propTypes,
}

delete propTypes.localeMatcher
delete propTypes.useGrouping

export default createComponent({displayName: 'Number', injectIntl: true, propTypes}, ({
    currency,
    currencyDisplay,
    maximumFractionDigits,
    maximumSignificantDigits,
    minimumFractionDigits,
    minimumIntegerDigits,
    minimumSignificantDigits,
    type,
    value,
    ...props
}, {intl}) => {
    const numberFormatOptions = {
        currency,
        currencyDisplay,
        maximumFractionDigits,
        maximumSignificantDigits,
        minimumFractionDigits,
        minimumIntegerDigits,
        minimumSignificantDigits,
        style: type,
    }

    return <Text {...props}>{intl.formatNumber(value, numberFormatOptions)}</Text>
})
