import { FC } from 'react';
import { Modal } from '../Modal';
import { createCn } from 'bem-react-classname';
import { Button } from '../Button';
import './style.css';

type TargetType = 'task' | 'category'

type PropsType = {
  type: TargetType
  onClose: () => void
  open: boolean
  target: string
  onConfirm: () => void
}

const targetTypes = {
  task: ['задачи', 'задачу'],
  category: ['категории', 'категорию'],
};

const cn = createCn('modalDelete');

export const ModalDelete: FC<PropsType> = ({ type, target, onConfirm, ...all }) => (
  <Modal className={cn()} title={`Удаление ${targetTypes[type][0]}`} {...all}>
    <div className={cn('body')}>
      Вы действительно хотите удалить {targetTypes[type][1]} {target}?
    </div>
    <div className={cn('controls')}>
      <Button
        className={cn('yes')}
        onClick={onConfirm}
      >
        Да
      </Button>
      <Button
        className={cn('no')}
        variant="secondary"
        onClick={all.onClose}
      >
        Нет
      </Button>
    </div>
  </Modal>
);
