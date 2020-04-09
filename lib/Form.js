import React from 'react';
import { formInput } from './FormInput';
import {
  Box,
  Field,
  Ul,
  Li,
  Div,
  Form,
  styleBuildRemove
} from '@cbryant24/styled-react';
import { useStateValue } from './App';

//TODO: add option for user to provide html .class or #id for styling or selection themselves
export default function({ inputs, form, validate, buttons, onSubmit }) {
  const [{ formErrors, fields }, dispatch] = useStateValue();
  const errorColor = formErrors.length >= 1 ? '#e95667' : null;

  const displayFields = () => {
    if (Array.isArray(inputs)) {
      return inputs.map(input => {
        const field = formInput(input, validate);
        return <Field key={input.data.name} {...input} {...field} />;
      });
    }
    const field = formInput(inputs, validate);
    return (
      <Field
        data={input.data}
        {...field}
        errors={fields[inputs.data.name].errorMessages}
      />
    );
  };

  //TODO: Add fallback buttons if none provided
  const displayButtons = () => {
    if (!buttons) return;

    return buttons.map(button => {
      const disabledStyle = button.disabledStyle
        ? styleBuildRemove(button.disabledStyle)
        : styleBuildRemove(button.style);

      const disabled = !isEnabled()
        ? {
            disabled: true,
            ...disabledStyle
          }
        : { ...styleBuildRemove(button.style) };

      return button.type === 'submit' ? (
        <Box
          key={`${button.type}-${Math.random() * 100}`}
          isA="button"
          type={button.type}
          {...disabled}
          onMouseDown={handleSubmit}
        >
          {button.text}
        </Box>
      ) : button.type === 'cancel' ? (
        <Div
          key={`${button.type}-${Math.random() * 100}`}
          isA="button"
          {...styleBuildRemove(button.style)}
          onMouseDown={
            button.cb ? e => handleCancel(e, button.cb) : handleCancel
          }
          type={button.type}
        >
          {button.text}
        </Div>
      ) : (
        <Div
          key={`${button.type}-${Math.random() * 100}`}
          isA="button"
          {...styleBuildRemove(button.style)}
          type={button.type}
          onMouseDown={button.cb}
        >
          {button.text}
        </Div>
      );
    });
  };

  const handleErrorMessages = errorMessages =>
    errorMessages.map(errorMessage => (
      <Li key={errorMessage.message}>{errorMessage.message}</Li>
    ));

  const handleCancel = (e, cb) => {
    e.preventDefault();

    dispatch({ type: 'RESET' });

    cb && cb();

    form.data.cancel && form.data.cancel();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { cb } = form.data;
    const { validation } = form.data;
    const formVals = {};
    let errors = [];

    Object.keys(fields).map(field => (formVals[field] = fields[field].value));

    const valid = validate
      ? validate({ submit: { ...formVals, ...validation } })
      : true;

    if (!valid) {
      validate.errors.forEach(error => errors.push(error));
      dispatch({ type: 'SET_FORM_ERRORS', payload: errors });
      return;
    }

    if (formErrors.length) dispatch({ type: 'SET_FORM_ERRORS', payload: [] });

    onSubmit && onSubmit(event, formVals);
    cb && cb(event, formVals);

    dispatch({ type: 'RESET' });
  };

  const isEnabled = () => {
    const disabled = inputs.some(input => {
      return !(input.data.required
        ? fields[input.data.name].value.length &&
          !fields[input.data.name].errorMessages.length &&
          fields[input.data.name].dirty &&
          !formErrors.length
        : true);
    });

    return !disabled;
  };

  return (
    <Form
      {...styleBuildRemove(form.style)}
      onSubmit={event => handleSubmit(event)}
    >
      {formErrors.length >= 1 ? (
        <Ul ml="2rem" color={errorColor} fontSize="1.2rem">
          {handleErrorMessages(formErrors)}
        </Ul>
      ) : (
        ''
      )}
      {displayFields()}
      <Div justifyContent="space-between">{displayButtons()}</Div>
    </Form>
  );
}
