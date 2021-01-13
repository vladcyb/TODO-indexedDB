import React, { FC } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button: FC<PropsType> = ({
                                        onClick,
                                        children,
                                        variant = 'primary',
                                        className,
                                      }) => {

  /* classes */
  const cn = createCn('button', className);

  return (
    <button
      className={cn({ [variant]: true })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
