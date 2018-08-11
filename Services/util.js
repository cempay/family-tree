export const isNil = (value) => {
  return value === null || value === undefined;
};

export const isEmpty = (value) => {
  return isNil(value)
    || value === false
    || (typeof value === 'object' && !Object.keys(value).length)
    || (Array.isArray(value) && !value.length);
};
