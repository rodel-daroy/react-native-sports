/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import ModalPicker from 'react-native-modal-selector'
import counties, {getLabel} from '../common/counties'
import {createComponent, StyleSheet} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    select: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_CONSTANTS.BXR_PRIMARY,
        height: 40,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    selectText: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        fontFamily: 'Montserrat-Light',
        textAlign: 'left',
    },
})

const propTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
}

export default createComponent({
    displayName: 'CountyPicker',
    propTypes,
},
({
    value,
    onValueChange = () => null,
}) => (
    <ModalPicker
        data={counties}
        initValue={value ? getLabel(value) : 'County'}
        onChange={onValueChange}
        selectStyle={styles.select}
        selectTextStyle={styles.selectText}
        style={styles.picker}
    />
))
