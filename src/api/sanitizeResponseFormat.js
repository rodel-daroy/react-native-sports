/* @flow */

import {camelize} from 'humps'
import immutable from 'immutable'

const responseKeyPathForMethodName = (soapMethodName: string): Array<string> => {
    const methodName = camelize(soapMethodName)

    return [
        'envelope',
        'body',
        `${methodName}Response`,
        `${methodName}Result`,
    ]
}

const bodyContainsError = (soapMethodName: string, body: Object): boolean => {
    const MINDBODY_SUCCESS_CODE = '200'

    const responseKeyPath = responseKeyPathForMethodName(soapMethodName)
    const errorCode = body.getIn([...responseKeyPath, 'errorCode'])

    return errorCode !== MINDBODY_SUCCESS_CODE
}

export default (soapMethodName: string): ?Object => {
    if (!soapMethodName) {
        throw new Error('You must provide a SOAP method name.')
    }

    return (body?: ?Object): ?Object => {
        if (!body) {
            return null
        }

        const responseKeyPath = responseKeyPathForMethodName(soapMethodName)

        return immutable.fromJS({
            isError: bodyContainsError(soapMethodName, body),
            response: body.getIn(responseKeyPath),
        })
    }
}
