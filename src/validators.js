export const validate = {
  title: 'signup',
  description: 'User Signup',
  inputs: [
    {
      name: 'email',
      blur: 'emptyOrEmail',
      change: 'emptyOrSafeString'
    },
    {
      name: 'name',
      blur: 'emptyOrSafeStringSpaces',
      change: 'emptyOrSafeStringSpaces',
    },
    {
      name: 'password',
      blur: 'emptyOrSafeString',
      change: 'emptyOrSafeString'
    },
    {
      name: 'confirm password',
      blur: 'emptyOrSafeString',
      change: 'emptyOrSafeString'
    }
  ],
  inputErrorMessages: {
    name: 'Name should only contain letters and numbers',
    email: 'Email should be in email format',
    password: 'Password should only contain letters, numbers, !@#$% characters ',
    'confirm password': 'Confirfm password should match password'
  },
  submit: [
    {
      name: 'email',
      validate: 'safeStringSpaces'
    },
    {
      name: 'name',
      validate: 'safeStringSpaces'
    },
    {
      name: 'password',
      validate: 'safeString',
    },
    {
      name: 'confirm password',
      validationType: 'allOf',
      match: 'password',
      validate: 'safeString'
    }
  ],
  submitErrorMessages: {
    'name': 'There was an error in the name field',
    'email': 'There was an error in the email field',
    'password': 'There was an error in the password field',
    "confirm password": 'passwords should match please check'
  }
};