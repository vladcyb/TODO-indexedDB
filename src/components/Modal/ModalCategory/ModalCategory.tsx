import React, { FC, useContext, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Input, Modal, Textarea } from '../../index';
import { createOrEdit } from '../../../shared/constants';
import './style.css';
import { useAppDispatch } from '../../../store';
import { ModalContext } from '../../HOCs/ModalProvider';
import { actions as categoriesActions } from '../../../store/categoriesReducer';
import { useInput } from '../../../shared/hooks/useInput';


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
  const nameField = useInput('', true);

  /* classes */
  const cn = createCn('modalCategory', className);

  /* state */
  const [description, setDescription] = useState('');

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    modalContext.setIsCreating!(false);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameField.value;
    if (name) {
      dispatch(categoriesActions.addCategory({
        category: {
          id: Math.random().toString(), // TODO
          name,
          description,
        },
      }));
      modalContext.setIsCreating!(false);
    }
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
          label="Имя"
          placeholder="Введите имя категории"
          autoFocus
          {...nameField}
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
