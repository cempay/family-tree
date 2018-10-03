const validateOneField = function(validations, value, props) {
  validations = Array.isArray(validations) ? validations : [validations || {}];
  for (let i = 0; i < validations.length; i++) {
    const { handler, message, ...params } = validations[i] || {};
    if (handler && handler.validator && !handler.validator(value, params, props)) {
      return message || handler.default.message || '';
    }
  }
};

const _isEmpty = function(value) {
  if (value === undefined) return true;
  if (value === null) return true;
  if (Number.isNaN(value)) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  return false;
};

const required = {
  validator(value) {
    return !_isEmpty(value);
  },
  default: {
    message: 'validator/mandatoryField',
  },
};

const validateRequired = value =>
  Validator.validateOneField(
    [
      {
        handler: Validator.required,
      },
    ],
    value,
  );

export default Validator = {
  validateOneField,

  required,
  validateRequired,
}