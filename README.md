# Styled React Forms


Styled React Forms is a library for creating and styling React forms using [Styled React](https://github.com/cbryant24/styled-react) css-in-js styling. Form Validation can be performed on keystroke, blur, dirty, and submit. JSON-Schema is used for validation which provides quick, secure, and customizable inputs and forms, for more information see [here](https://tools.ietf.org/html/draft-handrews-json-schema-validation-00) and Styled React Form section on [validation](#Validation)

## Getting Started

`npm install @cbryant24/styled-react-forms`

To get started import the `Form` component.

```javascript
import Form from '@cbryant24/styled-react-forms';
```

## Props

The `<Form />` component takes the following props: `form`, `inputs`, `validate`, `onSubmit`, `buttons`

### Form Prop

The form props is an object used to create the form using the properties `data` and `style`

| Prop           | Type     | Description                                     |
| -------------- | -------- | ------------------------------------------------|
| data           | object   | properties `name` and `cb`                      |

<br />

#### data properties

| Prop        | Type     | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| name        | string   | unique name of the input for use in the name attribute on the input        |
| cb          | function | function to be invoked after a success form submission.                    |


```javascript
const form = {
  data: {
    name: 'login' String[required],
    cb: setLogin Function[optional]
  }
};
```

### Style Prop

The `style` property can be used to style the form element using camel case css values or if using a `theme` and `ThemeProvider` with [Styled React library](https://github.com/cbryant24/styled-rect) a string or array of strings representing the corresponding named theme property for styling.

```javascript
const form = {
  ...
  style: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'gray.8',
    border: '1px solid black',
    width: [1], // if using theming
    padding: '4rem',
    zIndex: 20,
    themeStyle: 'marginSmall' // if using theming
  }
}
```

### Inputs Prop

The inputs property takes an array of objects that describe each input the form will display. Each input object takes the properties `data`, `fieldStyle`, and `inputStyle`

#### inputs: data

The data property contains the properties `type, name, label, placeholder, and required` properites

| Prop        | Type   | Description                                                                |
| ----------- | ------ | -------------------------------------------------------------------------- |
| type        | string | type of input to display i.e. email, input, select, textarea               |
| name        | string | unique name of the input for use in the name attribute on the input        |
| label       | string | a string value used for the label element with the input                   |
| placeholder | string | used for the placeholder text within the input                             |
| required    | boolean| true for field is required and validation passed to be submitted           |

```javascript
const inputs = [
  {
    data: {
      type: 'email' String,
      name: 'user-email' String[required],
      label: 'Email' String,
      placeholder: 'Please Enter Email' String,
      required: true Boolean
    }
    ...
  }
]
```

### FieldStyle Prop

The `fieldStyle` property can be used to style the field container that holds the input element and input error messages by using camel case css values or if using a `theme` and `ThemeProvider` with [Styled React library](https://github.com/cbryant24/styled-react) a string or array of strings representing the corresponding theme property name

```javascript
const inputs = [
  {
    ...
    fieldStyle: {
      width: 'inputWidth', // if using theme
      height: '15%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      themeStyle: 'marginSmall' // if using theming
    }
  }
]
```

### InputStyle Prop

The `inputStyle` property can be used to style the input located in the fieldStyle container by using camel case css values or if using a `theme` and `ThemeProvider` with [Styled React library](https://github.com/cbryant24/styled-react) a string or array of strings representing the corresponding theme property name

```javascript
const inputs = [
  {
    ...
    inputStyle: {
      color: 'blue',
      fontSize: '1.8em',
      minWidth: '100%'
    }
  }
]
/// if using theming
const inputs = [
  {
    ...
    inputStyle: {
      themeStyle: 'inputNormal'
    }
  }
]
```

### Buttons Prop

The `buttons` property taks an array of objects that describe each button the form will display. Each button object takes the properties `text, type, cb, style`

| Prop           | Type     | Description                                              |
| -------------- | -------- | ---------------------------------------------------------|
| text           | string   | text to be displayed in the button                       |
| type           | string   | type of button i.e. submit, cancel                       |
| cb             | function | invoked when the button is clicked                       |
| style          | object   | css camelcase properites for button style                |
| disabledStyles | object   | css camelcase properites for submit button when disabled |

<br />
The submit button is set to disabled if using form validation with the default disabled color style set to `grey`.  
<br/>
To style the disabled state pass the disabled styles in the `disabledStyles` property

```javascript
const buttons = [
  {
    text: 'Submit',
    type: 'submit',
    cb: onSubmit,
    style: 'squareButton' // if using theming
    disabledStyle: {
      color: 'gray',
      cursor: 'default',
      padding: '10px 20px'
    }
  }
];
```

### onSubmit Prop

The `onSubmit` prop takes a function that will be invoked when the form is submitted. The onSubmit function will receive both the current `input` value and the javascript `event` object. Any validation provided will be checked before submission if there are any errors in validation the form submission submit button will be disabled.

### Validate Peop

See the section [About Validation](#validation)

## Validation


Styled React forms provides form validation using JSON schema validation [see ajv for more detailed info](https://ajv.js.org/keywords.html)

### Getting Started

Validation for each input can be done on blur, change, and form submission.

Validation for each input and submission can be done using predefined checks [see list below for validation options](#validation-options)
Validation can be done by passing an object to the prop `validate` with the properties `title`, `description`, `inputs`, `inputErrorMessages`, `submit`, and `submitErrorMessages`.

| Prop               | Type   | Description                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------- |
| title              | string | form name defined in the `<Form />` component                             |
| description        | string | description of the form purpose/use                                       |
| inputs             | array  | array of objects representing the input to perform validation check       |
| inputErrorMessages | object | error message to be displayed for corresponding input                     |
| submit             | array  | inputs to validate when the form is submitted                             |
| submitErrorMessages| object | error message to be displayed for corresponding input field on submission |
<br />

### inputs: name blur change

The `inputs` property for validation takes an array of objects representing each input to perfrom validation for `change` or `blur` [see list below for validation options](#validation-options). Name must refer to the `name` used in the `inputs` property for form definition [see here](#inputs:-data)

```javascript
const validate = {
    ...
    inputs: [
      {
        name: 'email',
        blur: 'emptyOrEmail',
        change: 'emptyOrSafeString'
      },
    ]
    ...
}
```

### inputErrorMessages

Is an object that has the corresponding property name of the input `name` field for inputs in the form definition [see above](#inputs:-data) with a string error message do be displayed when error validation fails in the specified field

```javascript
const validate = {
  ...
  inputErrorMessages: {
    email: 'Email should be in email format'
  },
  ...
}
```

### submit

Submit takes an array representing the inputs to validate when the form is submitted

| Prop           | Type     | Description                                              |
| -------------- | -------- | ---------------------------------------------------------|
| name           | string   | name of the input to validate corresponds to the input defined in the form definiton array [see above](#inputs:-data) |
| validate       | string   | string name of validation to perform on form submission [see here for names](#validation-options)                     |
<br />

```javascript
const validate = {
  ...
  submit: [
    {
      name: 'email',
      validate: 'safeString'
    }
  ]
  ...
}
```

### Match

To validate for two fields that must match on submission use the property `match` in the `validate` object in the `submit` array with the name of the field to match with

```javascript
const validate = {
  ...
  submit: [
    {
      name: 'password',
      validate: 'safeString',
    },
    {
      name: 'confirm password',
      match: 'password'
    }
  ]
  ...
}
```
<br />

### Multiple Validations

For submit validating of multiple criteria use an array of validations strings. Use the property `validationType` to specify the type of multiple validation with one of the types `not, oneOf, anyOf, allOf`

### Not

`not: as long as the value does not pass all of the supplied validation the input value is valid`

```javascript
const validation = {
  ...
  submit: {

    name: 'password',
    validationType: 'not',
    validate: [
      'safeStringSpaces',
      'number'
    ]
  }
  ...
}
```

> `valid`: `'Hello'`, `'World'`  
> `invalid`: `'1'`, `'Hello World'`

<br />

### OneOf

`oneOf: as long as the value passes exactly one of the supplied validation the input value is valid`

```javascript
const validation = {
  ...
  submit: {
    name: 'password',
    validationType: 'oneOf',
    validate: [
      'safeString',
      'number'
    ]
  }
  ...
}
```

> `valid`: `'Hello'`, `'World'`, `8`  
> `invalid`: `'Hello1'`, `'Hello8World'`

<br />

### AnyOf

`anyOf: as long as the value passes any of the supplied validations the input value is valid - this is the default if none is provided`

```javascript
const validation = {
  ...
  submit: {
    name: 'password',
    validationType: 'allof',
    validate: [
      'safeStringSpaces',
      'number'
    ]
  }
  ...
}
```

> `valid:`: `'Hello World'`, `'World 8'`, `'hello-8-world'`  
> `invalid`: `'Hello/World'`, `'hello;@ world'`

### AllOf

`allOf: as long as the value passes all of the supplied validations the input vaule is valid`

```javascript
const validation = {
  ...
  submit: {
    name: 'password',
    validationType: 'allOf',
    validate: [
      'safeStringSpaces',
      'number'
    ]
  }
  ...
}
```

> `valid:`: `'Hello8World'`, `'World 8'`, `'hello-8-world'`  
> `invalid`: `'Hello World'`, `'hello;@ world'`, `'Hello'`  

### submitErrorMessages

Takes an object that has the corresponding property name of the submit `name` value [see above](#submit) with a string error message do be displayed when error validation fails for that specific field

```javascript
const validate = {
  ...
  submitErrorMessages: {
    email: 'Email should be in email format'
  },
  ...
}
```

### Sample Schema

```javascript
const scheme = {
  title: 'signup',
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
    password:
      'Password should only contain letters, numbers, and ! @ # $ % characters'
  },
  submit: [
    {
      name: 'email',
      validate: 'safeString'
    },
    {
      name: 'password',
      validate: 'safeString'
    }
  ],
  submitErrorMessages: {
    email: 'There was an error in the email field',
    password: 'There was an error in the password field'
  }
};
```

## Validation Options

### Empty or Safe String With Spaces

name: `emptyOrSafeStringSpaces`  
Description: Allows empty string, spaces, letters, numbers, and the following characters: @\*!.$  
Matches: '', Kanye West, a$ap Rocky, her.  
Non-Matches: /Carl, 'john', George ; Michael  

### Empty or Safe String

name: `emptyOrSafeString`  
Description: Allows empty string, letters, numbers, and the following characters: @\*!.$  
Matches: '', Kanye, a$ap, her.  
Non-Matches: /Carl, 'john', Kanye West  

#### Safe String

name: `safeString`  
Description: Allows letters, numbers, and the following characters: @\*!.$  
Matches: Kanye, a$ap, her.  
Non-Matches: /Carl, 'john', Kanye West  

#### Safe String With Spaces

name: `safeStringSpaces`  
Description: Allows spaces, letters, numbers, and the following characters: @\*!.$  
Matches: Kanye, a$ap, her.  
Non-Matches: '/Carl', 'john', 'Kanye West'  

#### Match

[See Match](#match)

### Default Validations

`maxLength: 128`  
`minLength: 1` (on form submit)
