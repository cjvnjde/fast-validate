import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import validator from '../src';

const dictionary = {
  en: {
    required: () => 'this field is required',
    max: (input, rule, validationResult) => `value should be less than ${rule}`,
    between: (input, [min, max], validationResult) => `this field should be between ${min} and ${max}`,
    even: (input, rule, validationResult) => `the value ${input} ${validationResult}`,
  },
}

const validators = {
  required: (value, rule) => rule && !value,
  max: (value, rule) => value > rule,
  between: (value, [a, b]) => value < a || value > b,
  even: (value, rule) => rule && value % 2 ? 'is not even' : 'is even',
}

validator.setDictionary(dictionary);
validator.setLocale('en');
validator.setValidators(validators);

const mountNode = document.getElementById('root');

ReactDOM.render(<App />, mountNode);
