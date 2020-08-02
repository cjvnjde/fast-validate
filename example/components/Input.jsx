import React, {useState} from 'react';
import validator from '../../src/validator';

function Input({ rules }) {
  const [value, setValue, errors] = useValidator('', rules);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {
          errors.map((err) => (<div key={err}>{err}</div>))
        }
      </div>
    </div>
  )
}

function useValidator(initialState, rules) {
  const [value, setValue] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const changeValue = (value) => {
    setValue(value);
    setErrors(validator.validate(value, rules))
  }

  return [value, changeValue, errors]
}

Input.defaultProps = {
  rules: {},
}

export default Input;
