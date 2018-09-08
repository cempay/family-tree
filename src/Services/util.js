export const isNil = value => value === null || value === undefined;

export const isEmpty = value => isNil(value)
    || value === false
    || (typeof value === 'object' && !Object.keys(value).length)
    || (Array.isArray(value) && !value.length);
