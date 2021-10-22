/* @flow */

import createComponent from '../../createComponent'
import Text from '../Text'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ...Text.propTypes,
}

const getOrdinalSuffix = (intl, value) =>
     ({
         one: `${value}st`,
         two: `${value}nd`,
         few: `${value}rd`,
     }[intl.formatPlural(value, {style: 'ordinal'})] || `${value}th`)


export default createComponent({displayName: 'Ordinal', injectIntl: true, propTypes}, ({
    value,
    ...props
}, {intl}) =>
    <Text {...props}>{getOrdinalSuffix(intl, value)}</Text>,
)
