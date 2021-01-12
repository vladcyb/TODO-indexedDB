import { FC, useState } from 'react';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { createCn } from 'bem-react-classname';
import './style.css';
import { Textarea } from '../Textarea';
import { Button } from '../Button';


type PropsType = {
  type: 'create' | 'edit'
  className?: string
  onClose: () => void
  onConfirm: () => void
  open: boolean
}

const verbs = {
  create: ['Создание', 'Создать'],
  edit: ['Редактирование', 'Сохранить'],
};

export const ModalCategory: FC<PropsType> = ({
                                               type,
                                               className,
                                               onConfirm,
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

  return (
    <Modal
      className={cn()}
      title={`${verbs[type][0]} категории`}
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
          {verbs[type][1]}
        </Button>
        <Button variant="secondary" onClick={modalProps.onClose}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};
