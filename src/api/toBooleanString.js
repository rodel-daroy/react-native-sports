/* @flow */

import R from 'ramda'

export default (value) => {
    if (R.isNil(value)) {
        return undefined // eslint-disable-line no-undefined
    }

    return value ? 'true' : 'false'
}
