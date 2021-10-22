/* @flow */

import createComponent from '../../createComponent'
import {FormattedRelative} from 'react-intl'
import React from 'react'
import Text from '../Text'

const propTypes = {
    ...FormattedRelative.propTypes,
    ...Text.propTypes,
}

export default createComponent({displayName: 'LocalDate', injectIntl: true, propTypes}, ({
    now,
    units,
    value,
    ...props
}, {intl}) => {
    const dateFormatOptions = {
        units,
        now,
    }

    return <Text {...props}>{intl.formatRelative(value, dateFormatOptions)}</Text>
})
