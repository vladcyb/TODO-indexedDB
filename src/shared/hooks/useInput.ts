import React, { useState } from 'react';
import { requiredFieldError } from '../constants';

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void

type ReturnedType = (initialValue?: string, required?: boolean) => {
  value: string
  onChange: ChangeHandler
  error: string
  onFocus: () => void
  required: boolean
}

export const useInput: ReturnedType = (initialValue = '', required) => {

  /* state */
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(required ? requiredFieldError : '');
  const [touched, setTouched] = useState(false);

  /* methods */
  const onChange: ChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    if (!value && required) {
      setError(requiredFieldError);
    } else {
      setError('');
    }
  };

  const onFocus = () => {
    setTouched(true);
  };

  return {
    value,
    onChange,
    error: touched ? error : '',
    onFocus,
    required: !!required,
  };
};
