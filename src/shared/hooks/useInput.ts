import React, { useState } from 'react';
import { requiredFieldError } from '../constants';

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void

type UseInputHookType = (initialValue?: string, required?: boolean) => {
  value: string
  onChange: ChangeHandler
  onFocus: () => void
  onBlur: () => void
  required: boolean
  error: string
  focused: boolean
}

export const useInput: UseInputHookType = (initialValue = '', required) => {

  /* state */
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(required && !initialValue ? requiredFieldError : '');
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

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
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return {
    value,
    onChange,
    onFocus,
    onBlur,
    required: !!required,
    focused,
    error: touched ? error : '',
  };
};
