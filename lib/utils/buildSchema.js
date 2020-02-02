function createSchema({title, description, inputs, submit, inputErrorMessages, submitErrorMessages}) {
  let schema = {};
  try {
    if (typeof title !== 'string') throw TypeError('title is required and must be a string');
    if (typeof description !== 'string' &&
        typeof description !== 'undefined') throw TypeError('title is required and must be a string');

    if (!Array.isArray(inputs)) throw TypeError('inputs must be an array');
    inputs.forEach(input => {
      if (typeof input.name !== 'string') throw TypeError('name in inputs is required for each input and must be a string');
      if (typeof input.blur !== 'string' &&
          typeof input.blur !== 'undefined') throw TypeError('blur in inputs must be a string');
      if (typeof input.change !== 'string' &&
          typeof input.change !== 'undefined') throw TypeError('change in inputs must be a string');    
    });

    if (inputErrorMessages) {
      if (typeof inputErrorMessages !== 'object' &&
          typeof inputErrorMessages !== 'undefined') throw TypError('errorMessages in inputs must be an object');
      for (const key in inputErrorMessages) {
        if (inputErrorMessages.hasOwnProperty(key)) {
          const element = inputErrorMessages[key];
          if (typeof element !== 'string') throw TypeError(`${key} in errorMessages in inputs type must be a string`);
        }
      }
    }

    if (submit) {
      if (!Array.isArray(submit)) throw TypeError('submit type must be an array');
      submit.forEach( submit => {
        if (typeof submit.name !== 'string') throw TypeError('name in submit must be a string');
        if (typeof submit.validate !== 'string') throw TypeError('validate in submit must be a string');
      });
    }

      
    if (submitErrorMessages) {
      for (const key in submitErrorMessages) {
        if (submitErrorMessages.hasOwnProperty(key)) {
          const element = submitErrorMessages[key];
          if (typeof element !== 'string') throw TypeError(`${key} in errorMessages in submit type must be a string`);
        }
      }
    }

    schema = {
      $schema: 'http://json-schema.org/draft-07/schema',
      title,
      description,
      type: 'object',
      properties: buildInputValidators(),
      errorMessage: {
        properties: buildInputErrorMessages()
      }
    }
    
    function buildInputValidators() {
      const inputValidators = {
        submit: {
          properties: {},
          errorMessage: {
            properties: {}
          }
        },
        errorMessage: {
          properties: {}
        }
      };

      inputs.forEach( input => {
        inputValidators[input.name] = {
          properties: {
            blur: { $ref: `patterns.json#/definitions/${input.blur}`},
            change: { $ref: `patterns.json#/definitions/${input.change}`}
          }
        }
      });

      submit.forEach(submit => {
        inputValidators.submit.properties = {
          ...inputValidators.submit.properties,
          [submit.name]: { $ref: `patterns.json#/definitions/${submit.validate}`},
        }
      });

      for (const key in submitErrorMessages) {
        if (submitErrorMessages.hasOwnProperty(key)) {
          const errorMessage = submitErrorMessages[key];
          inputValidators.submit.errorMessage.properties[key] = errorMessage;
        }
      }
      return {...inputValidators};
    }

    function buildInputErrorMessages() {
      const errorMessages = {};
      for (const key in inputErrorMessages) {
        if (inputErrorMessages.hasOwnProperty(key)) {
          const message = inputErrorMessages[key];
          errorMessages[key] = message;
        }
      }
      return {...errorMessages};
    }

    return schema;
  } catch(err) {
    console.log(err);
    return;
  }
}

export default createSchema;