/* @flow */

import {Animated} from 'react-native'
import StyleSheet from '../../StyleSheet'
import Touchable from '../../Components/Touchable'
import React from 'react'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    screenOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

export default class MenuOverlay extends React.PureComponent {
    componentDidMount() {
        this.fadeScreenIn()
    }

    screenOpacityValue = new Animated.Value(0)
    handleOverlayPressed = () => {
        this.fadeScreenOut() // eslint-disable-line no-invalid-this
        this.props.onPress() // eslint-disable-line no-invalid-this
    }

    fadeScreenIn() {
        Animated.timing(this.screenOpacityValue, {
            toValue: 100,
            duration: 300,
        }).start()
    }

    fadeScreenOut() {
        Animated.timing(this.screenOpacityValue, {
            toValue: 0,
            duration: 300,
        }).start()
    }


    getOverlayStyle(): Array<any> {
        const interpolatedColourAnimation = this.screenOpacityValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
        })

        return [styles.screenOverlay, {backgroundColor: interpolatedColourAnimation}]
    }

    render() {
        return (
            <Touchable
                activeOpacity={1}
                onPress={this.handleOverlayPressed}
                style={this.getOverlayStyle()}
            />
        )
    }
}

MenuOverlay.propTypes = {
    onPress: PropTypes.func,
}
