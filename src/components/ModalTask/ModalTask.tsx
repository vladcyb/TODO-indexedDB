import React, { FC, useState } from 'react';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { createCn } from 'bem-react-classname';
import { Select } from '../Select';
import './style.css';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import { createOrEdit } from '../../shared/constants';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice/selectors';


const cn = createCn('modalTask');

type PropsType = {
  type: 'create' | 'edit'
  onClose: () => void
  open: boolean
  className?: string
  onConfirm: () => void
  initialName: string
  initialDescription: string
  initialCategory: undefined | number
}


export const ModalTask: FC<PropsType> = ({
                                           type,
                                           onConfirm,
                                           initialName,
                                           initialDescription,
                                           initialCategory,
                                           onClose,
                                           ...modalProps
                                         }) => {

  /* hooks */
  const categories = useSelector(getCategories).map((item) => item.name);

  /* state */
  const [name, setName] = useState(initialName);
  const [currentCategory, setCurrentCategory] = useState<number | undefined>(initialCategory);
  const [description, setDescription] = useState(initialDescription);

  /* methods */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    setName(initialName);
    setCurrentCategory(initialCategory);
    setDescription(initialDescription);
    onClose();
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[type][0]} задачи`}
      onClose={handleClose}
      {...modalProps}
    >
      <div className={cn('body')}>
        <div className={cn('grid')}>
          <Input
            className={cn('name')}
            label="Имя"
            placeholder="Введите имя задачи"
            required
            value={name}
            onChange={handleNameChange}
          />
          <Select
            className={cn('category')}
            placeholder="Выберите категорию"
            list={categories}
            selectItem={setCurrentCategory}
            selected={currentCategory}
          />
          <Textarea
            className={cn('description')}
            placeholder="Введите описание задачи"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
      <div className={cn('controls')}>
        <Button className={cn('createControl')} onClick={onConfirm}>
          {createOrEdit[type][1]}
        </Button>
        <Button
          className={cn('closeControl')}
          variant="secondary"
          onClick={handleClose}
        >
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};
