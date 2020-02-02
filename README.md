# Styled React Forms

------------------------
This library is for creating and styling React forms using `styled-react` [library](https://github.com/cbryant24/styled-react) css-in-js styling. Validation can be performed on input keystroke, blur, dirty, and submit. Using JSON-Schema Validation for more information see [here](https://tools.ietf.org/html/draft-handrews-json-schema-validation-00) if form validation is needed for more info see section on [validation](#Validation)

## Getting Started

------------------------

`npm install @cbryant24/styled-react-forms`

To get started import the `Form` compenent.

```javascript
import Form from '@cbryant24/styled-react-forms';
```

### Form

------------------------

The form component takes the following props: `form`, `inputs`, `validate`, `onSubmit`, `buttons`

#### form

The form props is an object used to create the form using the nested properties `data` and `style`

##### data

The data object has two properties `name` which must be unique and `cb` a callback for the form on submission.

`name: a string value with the name of the input which must be unique and is required`
`style: object of camelcase css properties for styling the form`

```javascript
const form = {
  data:
    {
      name: String[required],
      cb: Function[optional]
    }
}
```

##### style

The `style` property can be used to style the form element using camel case css values or if using a `theme` and `ThemeProvider` from [styled-react library](https://github.com/cbryant24/styled-rect) a string or array of strings representing the corresponding theme property name

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
    zIndex: 20
  }
}
```

#### inputs

The inputs property takes an array of objects that describe each input the form will display. Each input object takes the properties `data, fieldStyle, and inputStyle`

##### inputs: data

The data property contains the properties `type, name, label, placeholder, and required` properites

`type: a string value with the type of inut i.e. email, input, select, textarea`
`name: a string value with the unique name of the input which will be used for the name attribute on the input`
`label: a string value used for the label element with the input`
`placeholder: a string value used for the placeholder text within the input`
`required: a boolean stating whether the field is required and meets validation guidelines to be submitted`

```javascript
const inputs = [
  {
    data: {
      type: String,
      name: String[required],
      label: String,
      placeholder: String,
      required: true
    }
    ...
  }
]
```

##### fieldStyle

The `fieldStyle` property can be used to style the field which is the container that holds the input element and input error messages by using camel case css values or if using a `theme` and `ThemeProvider` from[styled-react library](https://github.com/cbryant24/styled-react) a string or array of strings representing the corresponding theme property name

```javascript
const inputs = [
  {
    ...
    fieldStyle: {
      width: 'inputWidth', // if using theme
      height: '15%',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }
  }
]
```

##### inputStyle

The `inputStyle` property can be used to style the input located in the fieldStyle container by using camel case css values or if using a `theme` and `ThemeProvider` from[styled-react library](https://github.com/cbryant24/) a string or array of strings representing the corresponding theme property name

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
    inputStyle: 'inputNormal'
  }
]
```

#### buttons

The `buttons` prop taks an array of objects that describe each button the form will display. Each button object takes the properties `text, type, cb, style`

`text: a string value with the text to be displayed in the button`
`type: a string value the the type of button it is i.e. submit, cancel`
`cb: a function to be invoked when the button is clicked`
`style: an object of css camelcase properites to styled the button`

```javascript
const buttons = [
  {
    text: 'Cancel',
    type: 'cancel',
    cb: cancelcb,
    style: 'squareButton' // if using theming
  }
]
```

#### onSubmit

The onSubmit prop takes a function that will be invoked when the form is submitted. The onSubmit function will receive both the current `input` value and the javascript `event` object. Any validation provided will be checked before submission if there are any errors in validation the form submission will submit button will be disabled.

#### validate

See the section [About Validation](#validation)


## Validation

------------------------

Styled React forms provides form validation using JSON schema validation [see ajv for more detailed info](https://ajv.js.org/keywords.html)

### Getting Started

Validation for each input can be done on blur and change. Validation can also be performed when the form is submitted.

Validation for each input and submission can be checked using predefined validation checks [see list below for validation options](#validation-options)
Validation can be done by passing an object to the props `validate` with the properties `title, description, inputs, inputErrorMessages, submit, submitErrorMessages`.

#### title

`title: unique string the form of the form name`

#### description

`description: description of the form purpose/use`

#### validation inputs

`inputs: array of objects representing the input to perform validation check`

##### inputs: name blur change

`name: unique string name of the input`
`blur: string name of validation to perform on input blur` [see here for names](#validation-options)
`change: string name of validation to perform on input change` [see here for names](#validation-options)

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

#### inputErrorMessages

Is an object that has the corresponding property name of the input `name` field for inputs [see above](#inputs:-name-blur-change) with a string error message do be displayed when error validation fails in the specified field

```javascript
const validate = {
  ...
  inputErrorMessages: {
    email: 'Email should be in email format'
  },
  ...
}
```

#### submit

Submit takes an array representing the inputs to validate when the form is submitted

##### submit: name

`name: name of the input field to validate must correspond to one of the inputs defined in the inputs array`[see above](#inputs:-name-blur-change)

##### submit: validate

`validate: string name of validation to perform on form submission`[see here for names](#validation-options)

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

#### submitErrorMessages

Is an object that has the corresponding property name of the submit `name` field for submit [see above](#submit:-name) with a string error message do be displayed when error validation fails in the specified field

```javascript
const validate = {
  ...
  inputErrorMessages: {
    email: 'Email should be in email format'
  },
  ...
}
```

#### sample

------------------------

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
```

##### validation options

###### Empty or Safe String With Spaces

name: `emptyOrSafeStringSpaces`
Description: Allows empty string, spaces, letters, numbers, and the following characters: @*!.$
Matches: '', Kanye West, a$ap Rocky, her.
Non-Matches: /Carl, 'john', George ; Michael

###### Empty or Safe String

name: `emptyOrSafeString`
Description: Allows empty string, letters, numbers, and the following characters: @*!.$
Matches: '', Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

###### Safe String

name: `safeString`
Description: Allows letters, numbers, and the following characters: @*!.$
Matches: Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

###### Safe String With Spaces

name: `safeStringSpaces`
Description: Allows spaces, letters, numbers, and the following characters: @*!.$
Matches: Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

### Default Validations

`maxLength: 128`
`minLength: 1` (on form submit)
