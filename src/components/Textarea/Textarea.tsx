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
  const cn = createCn('input', className);

  return (
    <div className={cn({ error: !!error, textarea: true })}>
      <label className={cn('label')}>
        {label}{required ? <span className={cn('ast')}>*</span> : null}
      </label>
      <textarea
        className={cn('input')}
        {...textareaProps}
      />
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
};
