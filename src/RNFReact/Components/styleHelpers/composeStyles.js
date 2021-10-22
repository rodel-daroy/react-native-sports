/* @flow */

const createFunction = (direction) => (value) => ({direction, value})

export const top = createFunction('Top')
export const left = createFunction('Left')
export const right = createFunction('Right')
export const bottom = createFunction('Bottom')
export const all = createFunction('All')
export const leftRight = createFunction('LeftRight')
export const topBottom = createFunction('TopBottom')

type props = {
    direction: string;
    type: string;
    value: number;
}

const directionFunction = (type, {direction, value}: props) => ({
    All: {
        [`${type}Top`]: value,
        [`${type}Right`]: value,
        [`${type}Bottom`]: value,
        [`${type}Left`]: value,
    },
    LeftRight: {
        [`${type}Left`]: value,
        [`${type}Right`]: value,
    },
    TopBottom: {
        [`${type}Top`]: value,
        [`${type}Bottom`]: value,
    },
})[direction]

const createComposer = (type) => (...args) => args.reduce((prev, next) => {
    const multiObject = directionFunction(type, next)

    if (multiObject) {
        return multiObject
    }

    return {
        ...prev,
        [`${type}${next.direction}`]: next.value,
    }
}, {})

export const padding = createComposer('padding')

export const margin = createComposer('margin')
