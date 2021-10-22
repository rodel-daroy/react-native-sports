/* @flow */

import {decodeHTML} from 'entities'
import R from 'ramda'

const isValidString = R.allPass([
    R.complement(R.isNil),
    R.is(String),
])

const stripHTML = R.compose(R.trim, R.replace(/\s{2,}/g, ' '), R.replace(/<[^>]*>/g, ' '))
const santizeHTML = R.compose(decodeHTML, stripHTML)

export default R.cond([
    [isValidString, santizeHTML],
    [R.T, R.always(null)],
])
