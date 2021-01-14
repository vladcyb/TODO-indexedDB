import React, { FC, useContext, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Input, Modal, Textarea } from '../../components';
import { createOrEdit } from '../../shared/constants';
import './style.css';
import { useAppDispatch } from '../../store';
import { ModalContext } from '../HOCs/ModalProvider';
import { actions as categoriesActions } from '../../store/categoriesReducer';


type PropsType = {
  type: 'create' | 'edit'
  initialName: string
  initialDescription: string
  className?: string
}

export const ModalCategory: FC<PropsType> = ({
                                               type,
                                               className,
                                               initialDescription,
                                               initialName,
                                               ...modalProps
                                             }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useContext(ModalContext);

  /* classes */
  const cn = createCn('modalCategory', className);

  /* state */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  /* methods */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    setName(initialName);
    setDescription(initialDescription);
    modalContext.setIsCreating!(false);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(categoriesActions.addCategory({
      category: {
        id: Math.random().toString(), // TODO
        name,
        description,
      },
    }));
    modalContext.setIsCreating!(false);
  };


  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[type][0]} категории`}
      onClose={handleClose}
      open
      {...modalProps}
    >
      <form onSubmit={handleConfirm}>
        <Input
          className={cn('name')}
          required
          label="Имя"
          placeholder="Введите имя категории"
          onChange={handleNameChange}
          value={name}
          autoFocus
        />
        <Textarea
          className={cn('description')}
          label="Описание"
          placeholder="Введите описание категории"
          onChange={handleDescriptionChange}
          value={description}
        />
        <div className={cn('controls')}>
          <Button className={cn('confirm')} type="submit">
            {createOrEdit[type][1]}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
