import React, { FC } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea: FC<PropsType> = (
  {
    label,
    required,
    error,
    className,
    ...textareaProps
  }) => {

  /* classes */
  const cn = createCn('textarea', className);

  return (
    <div className={cn({ error: !!error })}>
      {/*<label className={cn('label')}>*/}
      {/*  {label}{required ? <span className={cn('ast')}>*</span> : null}*/}
      {/*</label>*/}
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>
          {label}{required && '*'}
        </legend>
      </fieldset>
      <textarea
        className={cn('textarea')}
        {...textareaProps}
      />
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
};
