/* @flow */

import createComponent from '../../createComponent'
import React from 'react'
import StyleSheet from '../../StyleSheet'
import Touchable from '../Touchable'
import View from '../View'

const styles = StyleSheet.create({
    row: {
        overflow: 'hidden',
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default createComponent({displayName: 'Row', propTypes: Touchable.propTypes}, ({
    children,
    style,
    ...props
}) => {
    const Wrapper = props.onPress ? Touchable : View

    return (
        <Wrapper
            style={[styles.row, style]}
            {...props}
        >
            {children}
        </Wrapper>
    )
})
