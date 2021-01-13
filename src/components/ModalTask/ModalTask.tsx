import React, { FC, useContext, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit } from '../../shared/constants';
import { Button, Input, Modal, Select, Textarea } from '../../components';
import { useAppDispatch } from '../../store';
import { actions as todosActions } from '../../store/todosReducer';
import { ModalContext } from '../HOCs/ModalProvider';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice/selectors';
import './style.css';


const cn = createCn('modalTask');

type PropsType = {
  type: 'create' | 'edit'
  className?: string
  initialName: string
  initialDescription: string
  initialCategoryId: string | undefined
}


export const ModalTask: FC<PropsType> = ({
                                           type,
                                           initialName,
                                           initialDescription,
                                           initialCategoryId,
                                           ...modalProps
                                         }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useContext(ModalContext);
  const categories = useSelector(getCategories);

  /* state */
  const [name, setName] = useState(initialName);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState(initialDescription);

  /* vars */
  const catId = selectedCategoryId || initialCategoryId

  /* methods */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = () => {
    if (catId) {
      dispatch(todosActions.addTodo({
        todo: {
          id: Math.random().toString(), // TODO
          name,
          description,
          categoryId: catId,
        },
      }));
      modalContext.setIsCreating!(false);
    }
  };

  const handleClose = () => {
    setName(initialName);
    setSelectedCategoryId(initialCategoryId);
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
            className={cn()}
            placeholder="Выберите категорию"
            list={categories}
            selectedId={catId}
            selectId={setSelectedCategoryId}
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
