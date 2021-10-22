/* @flow */

import immutable from 'immutable'

export default (value) => {
    if (!value) {
        return immutable.List()
    }

    return immutable.List.isList(value) ? value : immutable.List([value])
}
