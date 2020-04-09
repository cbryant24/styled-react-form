import React from 'react';
import Form from '@cbryant24/styled-react-form';
import { Div } from '@cbryant24/styled-react';
import { validate } from './validators';

export default props => {
  function alertMe(val, e) {
    alert('Ive been submitted');
  }

  function clickedMe(val, e) {
    alert('Ive been clicked');
  }

  const form = {
    data: { name: 'signup', cb: null },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      backgroundColor: 'blue',
      color: 'red',
      border: '1px solid black',
      width: '40rem',
      padding: '1rem',
      zIndex: 20
    }
  };

  const inputs = [
    {
      data: {
        type: 'input',
        name: 'name',
        label: 'name',
        placeholder: 'enter name',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'email',
        name: 'email',
        label: 'email',
        placeholder: 'enter email',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'password',
        label: 'password',
        placeholder: 'enter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'confirm password',
        label: 'confirm password',
        placeholder: 'reenter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    }
  ];

  const buttons = [
    {
      text: 'Submit',
      type: 'submit',
      cb: null,
      style: { themeStyle: 'squareButton', marginRight: '3rem' },
      disabledStyle: { themeStyle: 'disabledSquareButton' }
    },
    {
      text: 'Cancel',
      type: 'cancel',
      cb: clickedMe,
      style: { themeStyle: 'squareButton' }
    }
  ];

  return (
    <Div>
      <Form
        form={form}
        inputs={inputs}
        buttons={buttons}
        validate={validate}
        onSubmit={alertMe}
      />
    </Div>
  );
};
