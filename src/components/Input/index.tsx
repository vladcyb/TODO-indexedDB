import { FC } from 'react';
import './style.css';
import cn from 'classnames';


type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input: FC<PropsType> = (props) => {

  /* props */
  const { label, required, error, type = 'text', ...all } = props;

  return (
    <div className={cn('Input', { Input_error: !!error })}>
      <label className="Input__label">
        {label}{required ? <span className="Input__ast">*</span> : null}
      </label>
      <input
        className="Input__input"
        type={type}
        {...all}
      />
      <div className="Input__error">
        {error}
      </div>
    </div>
  );
};
