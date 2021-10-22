/* @flow */

import createComponent from '../../createComponent'
import defaultTo from '../../Utils/defaultTo'
import StyleSheet from '../../StyleSheet'
import View from '../View'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    horizontalLayout: {
        flexDirection: 'row',
    },
})

const propTypes = {
    weight: PropTypes.number,
    horizontalAlign: PropTypes.bool,
    verticalAlign: PropTypes.bool,
}

const styleFromProps = (weight, verticalAlign, horizontalAlign) => ({
    flex: defaultTo(weight, null),
    alignItems: verticalAlign ? 'center' : null,
    justifyContent: horizontalAlign ? 'center' : null,
})

export default createComponent({displayName: 'HorizontalLayout', propTypes}, ({
    style,
    verticalAlign,
    horizontalAlign,
    weight,
    ...props
}) => (
    <View
        {...props}
        style={[styles.horizontalLayout, styleFromProps(weight, verticalAlign, horizontalAlign), style]}
    />
))
