import { FC } from 'react'
import './style.css'


const Header: FC = () => {
  return (
    <div className="Header">
      <div className="Header__left">
        <div className="Header__title">ToDo List</div>
        <nav>
          <ul className="Header__ul">
            <li>
              <button className="Header__navBtn">Задачи</button>
            </li>
            <li>
              <button className="Header__navBtn">Категории</button>
            </li>
          </ul>
        </nav>
      </div>
      <button className="Header__addTask">
        Добавить задачу
      </button>
    </div>
  )
}

export default Header
