/* @flow */

import createComponent from '../../createComponent'
import {TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import PropTypes from 'prop-types';

const MINIMUM_TAPPABLE_LENGTH = 44

const calculateSlop = (measurement) => {
    if (measurement > MINIMUM_TAPPABLE_LENGTH) {
        return 0
    }

    return (MINIMUM_TAPPABLE_LENGTH - measurement) / 2
}

class Touchable extends Component {// eslint-disable-line react/require-optimization
    constructor() {
        super()

        this.calculateTouchableHitSlop = this.calculateTouchableHitSlop.bind(this)

        this.state = {
            slop: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        }
    }

    calculateTouchableHitSlop(event) {
        const {width, height} = event.nativeEvent.layout

        const widthSlop = calculateSlop(width)
        const heightSlop = calculateSlop(height)

        this.setState({
            slop: {
                top: heightSlop,
                bottom: heightSlop,
                left: widthSlop,
                right: widthSlop,
            },
        })
    }

    render() {
        return (
            <TouchableOpacity
                hitSlop={this.state.slop}
                onLayout={this.calculateTouchableHitSlop} // eslint-disable-line react/jsx-handler-names
                {...this.props}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

Touchable.propTypes = {
    // children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
}

export default createComponent({displayName: 'Touchable'}, Touchable)
