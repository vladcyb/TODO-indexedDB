import React, { FC } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button: FC<PropsType> = ({
                                        onClick,
                                        type = 'button',
                                        children,
                                        variant = 'primary',
                                        className,
                                        ...buttonProps
                                      }) => {

  /* classes */
  const cn = createCn('button', className);

  return (
    <button
      className={cn({ [variant]: true })}
      type={type}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
