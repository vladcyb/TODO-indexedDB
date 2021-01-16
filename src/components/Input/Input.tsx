import React, { FC, useState } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input: FC<PropsType> = (
  {
    label,
    required,
    error,
    type = 'text',
    className,
    onFocus,
    onBlur,
    ...inputProps
  }) => {

  /* classes */
  const cn = createCn('input', className);

  /* state */
  const [focused, setFocused] = useState(false);

  /* methods */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={cn({ error: !!error, focused })}>
      <label className={cn('label')}>
        {label}{required && <span className={cn('ast')}>*</span>}
      </label>
      <div className={cn('control')}>
        <input
          className={cn('input')}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
        <fieldset className={cn('fieldset')}>
          <legend className={cn('legend')}>
            {label}{required && '*'}
          </legend>
        </fieldset>
      </div>
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
};
