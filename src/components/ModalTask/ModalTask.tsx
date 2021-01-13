import React, { FC, useContext, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit } from '../../shared/constants';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { Button, Input, Modal, Select, Textarea } from '../../components';
import './style.css';
import { useAppDispatch } from '../../store';
import { actions as todosActions } from '../../store/todosReducer';
import { ModalContext } from '../HOCs/ModalProvider';


const cn = createCn('modalTask');

type PropsType = {
  type: 'create' | 'edit'
  className?: string
  initialName: string
  initialDescription: string
  initialCategory: undefined | number
}


export const ModalTask: FC<PropsType> = ({
                                           type,
                                           initialName,
                                           initialDescription,
                                           initialCategory,
                                           ...modalProps
                                         }) => {

  /* hooks */
  const categories = useSelector(getCategories);
  const dispatch = useAppDispatch();
  const modalContext = useContext(ModalContext);

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

  const handleConfirm = () => {
    if (typeof currentCategory === 'number') {
      dispatch(todosActions.addTodo({
        todo: {
          id: Math.random().toString(), // TODO
          name,
          description,
          categoryId: categories[currentCategory].id, // TODO
        },
      }));
    }
    modalContext.setIsCreating!(false);
  };

  const handleClose = () => {
    setName(initialName);
    setCurrentCategory(initialCategory);
    setDescription(initialDescription);
    modalContext.setIsCreating!(false);
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[type][0]} задачи`}
      onClose={handleClose}
      open
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
            list={categories.map((category) => category.name)}
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
        <Button
          className={cn('createControl')}
          onClick={handleConfirm}
        >
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
