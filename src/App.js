import React from 'react';
import Form from '@cbryant24/styled-react-form';

export default (props) => {
  function alertMe(val, e) {
    alert('Ive been submitted');
  }

  function clickedMe(val, e) {
    alert('Ive been clicked');
  }

  const squareButton = {
    pseudo: true,
    display: "inline-block",
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: '16px',
    minWidth: "20%",
    fontFamily: "inherit",
    fontWeight: "extraBold",
    lineHeight: "condensed",
    appearance: "none",
    cursor: "pointer",
    color: "white",
    boxShadow: "none",
    backgroundColor: "transparent",
    textDecoration: "none",
    transition: "box-shadow 0.125s ease-out 0s",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "currentcolor",
    px: '1rem',
    py: '2rem',
  }
  
  const inputNormal = {
    pseudo: true,
    appearance: 'none',
    display: 'block',
    verticalAlign: 'middle',
    width: '20rem',
    height: '35%',
    color: 'white',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(221, 225, 228)',
    transition: 'box-shadow 0.125s ease-out 0s',
    minHeight: '1.5em',
    mt: '1rem',
    focusWithin: {
      boxShadow: '0px 0px 8px green'
    }
  };

  const form = {
    data: { name: 'signup', cb: null},
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
  }

  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: '100%', height: '15%', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: {...inputNormal}
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: '100%', height: '15%', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: {...inputNormal}
    }
  ];

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...squareButton, marginRight: '3rem'} },
    { text: 'Cancel', type: 'cancel', cb: clickedMe, style: {...squareButton} }
  ];

  const validate = {
    title: 'signin',
    description: 'User Signin',
    inputs: [
      {
        name: 'email',
        blur: 'emptyOrEmail',
        change: 'emptyOrSafeString'
      },
      {
        name: 'password',
        blur: 'emptyOrSafeString',
        change: 'emptyOrSafeString'
      }
    ],
    inputErrorMessages: {
        email: 'Email should be in email format',
        password: 'Password should only contain letters, numbers, and ! @ # $ % characters'
    },
    submit: [
      {
        name: 'email',
        validate: 'safeString'
      },
      {
        name: 'password',
        validate: 'safeString',
      },
    ],
    submitErrorMessages: {
      email: 'There was an error in the email field',
      password: 'There was an error in the password field'
    }
  }

  return (
    <Form
      form={form}
      inputs={inputs}
      buttons={buttons}
      validate={validate}
      onSubmit={alertMe}
    />
  );
}

