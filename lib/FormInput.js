import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from './FormState';

export const formInput = ( { data: { name, inputData = {}, validation, type } }, validate) => {
  const [{ formErrors, fields }, dispatch] = useStateValue();

  // when component mounts check if the input type is select and checks if the options length is only one
  // set the select box to that value provided by updating the state
  // set the field as dirty so the form can be submitted if dirty is required
  useEffect( () => {
    //TODO: Add error catch for input options array type or no options
    if(type === 'select' && inputData.options.length === 1) {
      dispatch({ type: 'SET_VALUE', payload: { field: name, value: inputData.options[0][inputData.value] }});
      dispatch({ type: 'SET_INPUT_DIRTY', payload: { field: name, dirty: true } });
    }
  },[]);

  function handleChange(e) {
    const { name: field, value } = e.target;
    const valid = validate ? validate({ [field]: { change: value }}) : true;

    if (formErrors.length)
      dispatch({ type: 'SET_FORM_ERRORS', payload: [] });
    
    if(!fields[field].dirty)
      dispatch({ type: 'SET_INPUT_DIRTY', payload: { field, dirty: true } });

    if(!valid) {
      const errorMessages = [];
      validate.errors.map( error => errorMessages.push(error.message));
      return dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages }});
    }

    if(fields[field].errorMessages)
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages: [] } });

    dispatch({type: 'SET_VALUE', payload: { field, value }});
  }

  function handleBlur(e) {
    const { name: field, value } = e.target;
    const valid = validate({ [field]: { blur: value, ...validation }});
    
    if(!fields[field].touched)
      dispatch({ type: 'SET_INPUT_TOUCH', payload: { field, touched: true }});

    if(!valid) {
      const errorMessages = [];
      validate.errors.map( error => errorMessages.push(error.message));
      return dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages }});
    }

    if(valid && fields[field].errorMessages)
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages: [] } });
  }

  return {
    value: fields[name].value,
    errors: fields[name].errorMessages,
    onBlur: handleBlur,
    onChange: handleChange,
    options: inputData.options
  }
}