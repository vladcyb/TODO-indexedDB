import React, { FC } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  focused: boolean
}

export const Input: FC<PropsType> = (
  {
    label,
    required,
    error,
    type = 'text',
    className,
    focused,
    ...inputProps
  }) => {

  /* classes */
  const cn = createCn('input', className);

  return (
    <div className={cn({ error: !!error, focused })}>
      <label className={cn('label')}>
        {label}{required && <span className={cn('ast')}>*</span>}
      </label>
      <div className={cn('control')}>
        <input
          className={cn('input')}
          type={type}
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
