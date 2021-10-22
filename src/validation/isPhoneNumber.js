/* @flow */

export default (phone: string): boolean => (/^[0-9]{5,}$/).test(phone)
