import React, { FC, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Input, Modal, Textarea } from '../../components';
import { createOrEdit } from '../../shared/constants';
import './style.css';


type PropsType = {
  type: 'create' | 'edit'
  className?: string
  onClose: () => void
  onConfirm: () => void
  open: boolean
  initialName: string
  initialDescription: string
}

export const ModalCategory: FC<PropsType> = ({
                                               type,
                                               className,
                                               onConfirm,
                                               onClose,
                                               initialDescription,
                                               initialName,
                                               ...modalProps
                                             }) => {
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
    onClose();
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[type][0]} категории`}
      onClose={handleClose}
      {...modalProps}
    >
      <Input
        className={cn('name')}
        required
        label="Имя"
        placeholder="Введите имя категории"
        onChange={handleNameChange}
        value={name}
      />
      <Textarea
        className={cn('description')}
        label="Описание"
        placeholder="Введите описание категории"
        onChange={handleDescriptionChange}
        value={description}
      />
      <div className={cn('controls')}>
        <Button className={cn('confirm')} onClick={onConfirm}>
          {createOrEdit[type][1]}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};
