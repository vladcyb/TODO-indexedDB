import { FC } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../components';
import { taskOrCategoryWords } from '../../shared/constants';
import './style.css';


type TargetType = 'task' | 'category'

type PropsType = {
  type: TargetType
  onClose: () => void
  open: boolean
  target: string
  onConfirm: () => void
}

const cn = createCn('modalDelete');

export const ModalDelete: FC<PropsType> = ({ type, target, onConfirm, ...all }) => (
  <Modal className={cn()} title={`Удаление ${taskOrCategoryWords[type][0]}`} {...all}>
    <div className={cn('body')}>
      Вы действительно хотите удалить {taskOrCategoryWords[type][1]} {target}?
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
