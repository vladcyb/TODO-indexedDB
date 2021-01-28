import React, { useCallback } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

const cn = createCn('listItem');

type PropsType = {
  id: number
  name: string
  description: string
  categoryName?: string
  onDelete: (id: number) => void
  onEdit: (id: number) => void
};

export const ListItem = ({
  id,
  name,
  description,
  categoryName,
  onDelete,
  onEdit,
}: PropsType) => {
  // eslint-disable-next-line
  const handleEdit = useCallback(() => onEdit(id), [])
  // eslint-disable-next-line
  const handleDelete = useCallback(() => onDelete(id), [])

  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <div className={cn('top')}>
          <div className={cn('name')} title={name}>
            {name}
          </div>
          {categoryName && (
            <div className={cn('category')} title={categoryName}>
              {categoryName}
            </div>
          )}
        </div>
        <div className={cn('description')} title={description}>
          {description}
        </div>
      </div>
      <div className={cn('actions')}>
        <button className={cn('edit')} onClick={handleEdit} type="button">
          <img
            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 18.9993V24H5.00069L19.756 9.24459L14.7553 4.2439L0 18.9993Z' fill='%233F72AF'/%3E%3Cpath d='M23.61 3.5038L20.4962 0.390054C19.9762 -0.130018 19.1294 -0.130018 18.6093 0.390054L16.1689 2.83039L21.1696 7.83108L23.61 5.39074C24.1301 4.87067 24.1301 4.02387 23.61 3.5038Z' fill='%233F72AF'/%3E%3C/svg%3E%0A"
            alt=""
          />
        </button>
        <button className={cn('delete')} onClick={handleDelete} type="button">
          <img
            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 21.3333C4 22.8067 5.19331 24 6.66669 24H17.3334C18.8067 24 20 22.8067 20 21.3333V5.33331H4V21.3333Z' fill='%233F72AF'/%3E%3Cpath d='M16.6667 1.33331L15.3334 0H8.66675L7.33337 1.33331H2.66675V4H21.3334V1.33331H16.6667Z' fill='%233F72AF'/%3E%3C/svg%3E%0A"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
