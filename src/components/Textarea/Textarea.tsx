import React, { useState } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type PropsType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
};

export const Textarea = ({
  label,
  required,
  error,
  className,
  onFocus,
  onBlur,
  ...textareaProps
}: PropsType) => {
  /* classes */
  const cn = createCn('textarea', className);

  /* state */
  const [focused, setFocused] = useState(false);

  /* methods */
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={cn({ error: !!error, focused })}>
      <label className={cn('label')}>
        {label}
        {required ? <span className={cn('ast')}>*</span> : null}
      </label>
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>
          {label}
          {required && '*'}
        </legend>
      </fieldset>
      <textarea
        className={cn('textarea')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textareaProps}
      />
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
};
