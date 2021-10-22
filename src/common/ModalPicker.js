/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import ModalPicker from 'react-native-modal-selector'
import SmallText from '../common/text/SmallText'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    Row,
    StyleSheet,
} from '../RNFReact'

const styles = StyleSheet.create({
    picker: {
        flex: 1.25,
        alignItems: 'flex-end',
    },
    pickerLabel: {
        flex: 1,
    },
    select: {
        borderWidth: 0,
    },
    selectText: {
        fontFamily: 'Montserrat-Light',
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'right',
    },
})

export default class Picker extends Component {

    static propTypes = {
        initValue: PropTypes.string,
        onChange: PropTypes.func,
        pickerData: ModalPicker.propTypes.data,
        pickerLabel: PropTypes.string,
    }

    onRowWasTapped = () => {
        if (!this.modalPicker) {
            return
        }

        this.modalPicker.open()
    }

    render() {
        const {
            initValue,
            onChange,
            pickerData,
            pickerLabel,
        } = this.props

        return (
            <Row
                onPress={this.onRowWasTapped} // eslint-disable-line react/jsx-handler-names
            >
                <SmallText style={styles.pickerLabel}>{pickerLabel}</SmallText>
                <ModalPicker
                    data={pickerData}
                    initValue={initValue ? initValue : '---'}
                    onChange={onChange}
                    ref={(modalPicker) => {
                        this.modalPicker = modalPicker
                    }}
                    selectStyle={styles.select}
                    selectTextStyle={styles.selectText}
                    style={styles.picker}
                />
            </Row>
        )
    }
}
