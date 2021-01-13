import { FC, useContext } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../components';
import { taskOrCategoryWords } from '../../shared/constants';
import './style.css';
import { ModalContext } from '../HOCs/ModalProvider';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/appReducer/selectors';
import { actions as tasksActions } from '../../store/todosReducer';
import { useAppDispatch } from '../../store';


type TargetType = 'task' | 'category'

type PropsType = {
  type: TargetType
  open: boolean
  target: string
}

const cn = createCn('modalDelete');

export const ModalDelete: FC<PropsType> = ({
                                             type,
                                             target,
                                             ...modalProps
                                           }) => {

  /* hooks */
  const modalContext = useContext(ModalContext);
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch()

  /* methods */
  const handleClose = () => {
    if (state === 'tasks') {
      modalContext.setDeletingTaskId!('');
    } else {
      modalContext.setDeletingCategoryId!('');
    }
  };

  const handleConfirm = () => {
    if (state === 'tasks') {
      dispatch(tasksActions.deleteTodo({
        id: modalContext.deletingTaskId!,
      }));
    } else {
    }
  };

  return (
    <Modal
      className={cn()}
      title={`Удаление ${taskOrCategoryWords[type][0]}`}
      onClose={handleClose}
      {...modalProps}
    >
      <div className={cn('body')}>
        Вы действительно хотите удалить {taskOrCategoryWords[type][1]} {target}?
      </div>
      <div className={cn('controls')}>
        <Button
          className={cn('yes')}
          onClick={handleConfirm}
        >
          Да
        </Button>
        <Button
          className={cn('no')}
          variant="secondary"
          onClick={handleClose}
        >
          Нет
        </Button>
      </div>
    </Modal>
  );
};
