/* @flow */

import {allPass} from 'ramda'
import immutable from 'immutable'
import isImmutable from '../../isImmutable'

const EMPTY_SECTION = immutable.fromJS([
    {
        items: [],
    },
])

const wrapRowDataInSection = (rowData) => immutable.fromJS([
    {
        items: rowData,
    },
])

const isValidRowData = (rowData) => rowData && rowData.count()

export default (rowData) => {
    if (!isValidRowData(rowData)) {
        return EMPTY_SECTION
    }

    const hasItemsProp = (d) => d.has('items')
    const existingSections = rowData.filter(allPass([isImmutable, hasItemsProp]))
    const alreadyContainsSections = existingSections.count() > 0

    if (alreadyContainsSections) {
        return existingSections
    }

    return wrapRowDataInSection(rowData)
}
