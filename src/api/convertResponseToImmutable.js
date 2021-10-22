/* @flow */

import immutable from 'immutable'

export default (body?: ?Object): ?Object => body ? immutable.fromJS(body) : null
