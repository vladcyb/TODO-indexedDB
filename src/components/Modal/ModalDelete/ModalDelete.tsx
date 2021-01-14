import { FC, useContext } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../index';
import { taskOrCategoryWords } from '../../../shared/constants';
import { ModalContext } from '../../HOCs/ModalProvider';
import { useSelector } from 'react-redux';
import { getAppState } from '../../../store/appReducer/selectors';
import { actions, useAppDispatch } from '../../../store';
import './style.css';
import { getCategories } from '../../../store/categoriesReducer/selectors';
import { getTasks } from '../../../store/tasksReducer/selectors';


type TargetType = 'task' | 'category'

type PropsType = {
  type: TargetType
  onClose: () => void
}

const cn = createCn('modalDelete');

export const ModalDelete: FC<PropsType> = ({
                                             type,
                                             onClose,
                                             ...modalProps
                                           }) => {

  /* hooks */
  const modalContext = useContext(ModalContext);
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch();
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const target = type === 'category' ?
    categories.find((item) => item.id === modalContext.deletingCategoryId)!.name :
    tasks.find((item) => item.id === modalContext.deletingTaskId)!.name;


  /* methods */
  const handleConfirm = () => {
    if (state === 'tasks') {
      dispatch(actions.tasks.deleteTask({
        id: modalContext.deletingTaskId!,
      }));
      onClose();
    } else {
      dispatch(actions.categories.deleteCategory(modalContext.deletingCategoryId!));
      onClose();
    }
  };

  return (
    <Modal
      className={cn()}
      title={`Удаление ${taskOrCategoryWords[type][0]}`}
      onClose={onClose}
      open
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
          onClick={onClose}
        >
          Нет
        </Button>
      </div>
    </Modal>
  );
};
