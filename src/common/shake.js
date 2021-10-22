/* @flow */

import {debounce} from 'lodash'
import {DeviceEventEmitter, NativeModules} from 'react-native'

const {
    Accelerometer,
} = NativeModules

export const subscribeToShake = (onShake) => {
    const ACCELERATION_THRESHOLD = 1.85
    const MINIMUM_DELAY_BETWEEN_SHAKES_IN_MS = 1250

    const shakeCallback = debounce(onShake, MINIMUM_DELAY_BETWEEN_SHAKES_IN_MS, {
        leading: true,
        trailing: false,
    })

    DeviceEventEmitter.addListener('AccelerationData', (data) => { // eslint-disable-line id-blacklist
        const {x, y, z} = data.acceleration // eslint-disable-line id-blacklist
        const magnitude = Math.sqrt((x * x) + (y * y) + (z * z))

        if (magnitude >= ACCELERATION_THRESHOLD) {
            shakeCallback()
        }
    })

    Accelerometer.setAccelerometerUpdateInterval(0.2)
    Accelerometer.startAccelerometerUpdates()
}

export const unsubsribeFromShake = (onShake) => {
    Accelerometer.stopAccelerometerUpdates()
    DeviceEventEmitter.removeListener('AccelerationData', onShake)
}
