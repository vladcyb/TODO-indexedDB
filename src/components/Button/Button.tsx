import React from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
};

export const Button = ({
  onClick,
  type = 'button',
  children,
  variant = 'primary',
  className,
  ...buttonProps
}: PropsType) => {
  /* classes */
  const cn = createCn('button', className);

  return (
    <button
      className={cn({ [variant]: true })}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
