import React, { FC } from 'react';
import './style.css';
import { createCn } from 'bem-react-classname';


type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input: FC<PropsType> = ({
                                       label,
                                       required,
                                       error,
                                       type = 'text',
                                       className,
                                       ...all
                                     }) => {

  /* classes */
  const cn = createCn('input', className);

  return (
    <div className={cn({ error: !!error })}>
      <label className={cn('label')}>
        {label}{required ? <span className={cn('ast')}>*</span> : null}
      </label>
      <input
        className={cn('input')}
        type={type}
        {...all}
      />
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
};
