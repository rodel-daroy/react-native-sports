/* @flow */

const isUnknownResponse = (response: Object): boolean => !response.has('isError')

export default (response?: ?Object): boolean => {
    if (!response || isUnknownResponse(response)) {
        return true
    }

    return response.get('isError')
}
