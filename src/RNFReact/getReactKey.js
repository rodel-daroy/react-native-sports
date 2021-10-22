/* @flow */

import isImmutable from './isImmutable'
import R from 'ramda'

const getKeyFromImmutableItem = (item) => {
    const key = item.get('key')

    return R.isNil(key) ? String(item.hashCode()) : key
}

export default (item) => {
    if (R.isNil(item)) {
        return null
    } else if (isImmutable(item)) {
        return getKeyFromImmutableItem(item)
    }

    return String(item)
}
