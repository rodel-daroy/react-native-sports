/* @flow */

import R from 'ramda'

export default (tag, value) => R.isNil(value) ? '' :
    `<${tag}>${value}</${tag}>`
