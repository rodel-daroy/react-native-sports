/* @flow */

import immutable from 'immutable'

export default (clientServices) => {
    if (!clientServices) {
        return immutable.List()
    }

    return clientServices.filter(
        (item) => parseInt(item.get('remaining'), 10) > 0,
   )
}
