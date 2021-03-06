import React, { useState } from 'react';
import { requiredFieldError } from '../constants';

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

type ReturnedType = {
  value: string
  onChange: ChangeHandler
  required: boolean
  error: string
  onBlur: () => void
};

export const useInput = (
  initialValue = '',
  required?: boolean,
  submitted?: boolean,
): ReturnedType => {
  /* state */
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(required && !initialValue ? requiredFieldError : '');
  const [isDirty, setIsDirty] = useState(false);

  /* methods */
  const onChange: ChangeHandler = (e) => {
    setIsDirty(true);
    setValue(e.target.value);
    if (!e.target.value && required) {
      setError(requiredFieldError);
    } else {
      setError('');
    }
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    required: !!required,
    error: isDirty || submitted ? error : '',
    onBlur,
  };
};
