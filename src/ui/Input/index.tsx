import { FC } from 'react'
import './style.css'

type PropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

const Input: FC<PropsType> = (props) => {

  /* props */
  const { label, required, error, type = 'text', ...all } = props

  return (
    <div className={`Input ${!!error ? 'Input_error' : ''}`}>
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
  )
}

export default Input
