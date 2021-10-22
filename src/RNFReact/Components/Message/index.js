/* @flow */

import createComponent from '../../createComponent'
import React from 'react'
import Text from '../Text'

export default createComponent({displayName: 'Message', injectIntl: true, propTypes: Text.propTypes},
({message, values, children, ...props}, {intl}) => (
    <Text {...props}>
        {message ? intl.formatMessage(message, values) : children}
    </Text>
))
