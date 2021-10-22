/* @flow */

export default (password: string): boolean => (/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/).test(password)
