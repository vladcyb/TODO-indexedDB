import { FC } from 'react';
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
      />
      <Textarea
        className={cn('description')}
        label="Описание"
        placeholder="Введите описание категории"
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
