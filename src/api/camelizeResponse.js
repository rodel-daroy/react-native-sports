/* @flow */

import {camelizeKeys} from 'humps'

export default (body?: ?Object): ?Object => camelizeKeys(body)
