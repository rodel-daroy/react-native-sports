/* @flow */

import R from 'ramda'

const formatSessionTypeIds = (sessionTypeIds) => sessionTypeIds.join('')

const parseIdsToXMLAttributes = (ids: Array<string>, elementType: string = 'int') => {
    if (!ids) {
        return ''
    }

    const extractIds = R.compose(
        formatSessionTypeIds,
        R.map((programId) => `<${elementType}>${programId}</${elementType}>`),
    )

    return extractIds(ids)
}

export default parseIdsToXMLAttributes
