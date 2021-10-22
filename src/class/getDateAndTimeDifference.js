/* @flow */

export default (field: string = 'startDateTime') => (a, b) => {
    const dateA = a && a.get(field) ? new Date(a.get(field)) : null
    const dateB = b && b.get(field) ? new Date(b.get(field)) : null

    return dateA - dateB
}
