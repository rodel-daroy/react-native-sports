/* @flow */

export default (value: ?string): boolean => value ? Boolean(value.trim()) : false
