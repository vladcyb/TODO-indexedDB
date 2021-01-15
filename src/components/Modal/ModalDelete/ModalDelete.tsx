import { FC, useContext } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../index';
import { ModalTargetType, taskOrCategoryWords } from '../../../shared/constants';
import { useSelector } from 'react-redux';
import { getAppState } from '../../../store/appSlice/selectors';
import { useAppDispatch } from '../../../store';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { useSetters } from '../../../shared/hooks/useSetters';
import { CategoriesThunk } from '../../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../../store/tasksSlice/thunk';
import { ModalContext } from '../../HOCs/ModalProvider';
import './style.css';


type PropsType = {
  type: ModalTargetType
  onClose: () => void
}

const cn = createCn('modalDelete');

export const ModalDelete: FC<PropsType> = (
  {
    type,
    onClose,
    ...modalProps
  }) => {

  /* hooks */
  const { deletingId } = useContext(ModalContext);
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch();
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const target = type === ModalTargetType.category ?
    categories.find((item) => item.id === deletingId)!.name :
    tasks.find((item) => item.id === deletingId)!.name;

  /* thunk */
  const [getters, setters] = useSetters();
  const categoriesThunk = CategoriesThunk(setters);
  const tasksThunk = TasksThunk(setters);

  /* methods */
  const handleConfirm = () => {
    if (state === 'tasks') {
      dispatch(tasksThunk.drop(deletingId!));
      onClose();
    } else {
      dispatch(categoriesThunk.drop(deletingId!));
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
