import React from 'react';

import { StateProvider } from './FormState';
import Form from './Form';
import { useStateValue } from './FormState';
import { buildValidator } from './utils';

export { useStateValue };

export default function FormApp({form, inputs, validate, buttons, onSubmit}) {
  const validator = validate ? buildValidator(validate) : null;

  try {
    if (!form) throw 'form is undefined please pass a form object';
    if (!form.data) throw 'form data is undefined please pass a form object with a valid data property';
    if (!inputs) throw 'inputs is undefined please pass a array list of inputs';
    if (typeof validate !== 'object' && validate) throw 'validate must be an object';
    if (onSubmit && typeof onSubmit !== 'function') throw TypeError('onSubmit must be a function');
  } catch(err) {
    console.log('Form App Form Error: ', err);
    return;
  }

  try {
    if (typeof form.data !== 'object') throw TypeError ('form data type must be an object');
    if (typeof form.data.name !== 'string') throw TypeError ('form name type must be a string');
    if (form.data.cb && typeof form.data.cb !== 'function') throw TypeError ('form cb type must be a function if provided');

  } catch(err) {
    console.log('Form App Form Data Error: ', err);
    return;
  }

  try {
    if (!Array.isArray(inputs)) throw TypeError ('inputs must be an array');
    inputs.forEach( input => {
      if (!input.data) throw TypeError('data must be an object');
      if (input.data.name && 
          typeof input.data.name !== 'string') throw TypeError('name must be a string');
      if (input.data.label && 
          typeof input.data.label !== 'string') throw TypeError('label must be a string');
      if (input.data.placeholder && 
          typeof input.data.placeholder !== 'string') throw TypeError('placeholder must be a string');
      if (input.data.required && 
          typeof input.data.required !== 'boolean') throw TypeError('reuire type must be a boolean');
    })
  } catch(err) {
    console.log('Form App Input Error: ', err);
    return;
  }

  //initialzie the state
  const initialState = {
    formName: form.data.name,
    fields: {}
  };

  // set the initial values for the fields to be used in the reducer
  function setInitialStateValues() {
  
    inputs.forEach( input => {

      if (!input) return;

      return (
      initialState.fields = {
        ...initialState.fields,
        [input.data.name]: {
          value: input.data.initialValue || '',
          errorMessages: [],
          touched: false,
          dirty: false
        }
      }
      )
    });
    return initialState
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_VALUE':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              value: action.payload.value
            }
          }
        };
      case 'SET_ERROR_MESSAGE':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              errorMessages: action.payload.errorMessages
            }
          }
        };
      case 'SET_INPUT_TOUCH':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              touched: action.payload.touched
            }
          }
        };
      case 'SET_INPUT_DIRTY':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              dirty: action.payload.dirty
            }
          }
        };
      case 'RESET':
        return setInitialStateValues();
    }
  }
  
  return (
      <StateProvider initialState={setInitialStateValues()} reducer={reducer}>
          <Form inputs={inputs} form={form} validate={validator} buttons={buttons} onSubmit={onSubmit} />
      </StateProvider>
  );
}