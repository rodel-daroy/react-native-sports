/* @flow */

import R from 'ramda'

const createTag = (tag) => (value) => `<${tag}>${value}</${tag}>`

export default (tag, childTag, values) => R.isNil(values) ? '' :
    `<${tag}>
        ${values.map(createTag(childTag)).join('')}
    </${tag}>`
