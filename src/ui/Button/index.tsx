import { FC } from 'react'
import './style.css'


type PropsType = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const Button: FC<PropsType> = (props) => {

  /* props */
  const { onClick, children, variant = 'primary' } = props

  return (
    <button
      className={`Button Button_${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
