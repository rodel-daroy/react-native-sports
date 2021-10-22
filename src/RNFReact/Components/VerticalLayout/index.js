/* @flow */

import createComponent from '../../createComponent'
import defaultTo from '../../Utils/defaultTo'
import StyleSheet from '../../StyleSheet'
import View from '../View'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    verticalLayout: {
        flexDirection: 'column',
    },
})

const propTypes = {
    weight: PropTypes.number,
    verticalAlign: PropTypes.bool,
    horizontalAlign: PropTypes.bool,
}

const styleFromProps = (weight, verticalAlign, horizontalAlign) => ({
    flex: defaultTo(weight, null),
    justifyContent: verticalAlign ? 'center' : null,
    alignItems: horizontalAlign ? 'center' : null,
})

export default createComponent({displayName: 'VerticalLayout', propTypes}, ({
    style,
    verticalAlign,
    horizontalAlign,
    weight,
    ...props
}) => (
    <View
        {...props}
        style={[styles.verticalLayout, styleFromProps(weight, verticalAlign, horizontalAlign), style]}
    />
))
