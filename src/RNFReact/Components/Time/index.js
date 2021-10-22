/* @flow */

import createComponent from '../../createComponent'
import {FormattedTime} from 'react-intl'
import Text from '../Text'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    is12HourFormat: PropTypes.bool,
    isUTCTimeZone: PropTypes.bool,
    showSeconds: PropTypes.bool,
    ...FormattedTime.propTypes,
    ...Text.propTypes,
}

export default createComponent({displayName: 'Time', injectIntl: true, propTypes}, ({
    is12HourFormat,
    isUTCTimeZone,
    showSeconds,
    value,
    ...props
}, {intl}) => {
    const secondFormatOption = showSeconds ? {second: 'numeric'} : {}
    const timeZoneFormatOption = isUTCTimeZone ? {timeZone: 'UTC'} : {}

    const timeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: is12HourFormat,
        ...secondFormatOption,
        ...timeZoneFormatOption,
    }

    return <Text {...props}>{intl.formatTime(value, timeFormatOptions)}</Text>
})
