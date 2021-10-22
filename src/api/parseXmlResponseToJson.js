/* @flow */

import X2JS from 'x2js'

const x2js = new X2JS()

export default (body?: ?string): ?string => x2js.xml2js(body)
