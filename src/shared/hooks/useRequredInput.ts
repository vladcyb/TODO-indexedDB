import React, { useState } from 'react';

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void

type UseRequiredInput = (initialValue?: string) => {
  value: string
  onChange: ChangeHandler
  error: string
  onFocus: () => void
}

export const useRequiredInput: UseRequiredInput = (initialValue = '') => {

  /* state */
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('Поле должно быть обязательным');
  const [touched, setTouched] = useState(false);

  /* methods */
  const onChange: ChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    if (!value) {
      setError('Поле должно быть обязательным');
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
  };
};
