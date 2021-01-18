import { FC, useMemo, useRef } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../index';
import { CurrentState, taskOrCategoryWords } from '../../../shared/constants';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { useTabulation } from '../useTabulation';
import './style.css';
import { useAppDispatch } from '../../../store';
import { CategoriesThunk } from '../../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../../store/tasksSlice/thunk';


type PropsType = {
  currentState: CurrentState
  onClose: () => void
  targetId: number
}

const cn = createCn('modalDelete');


export const ModalDelete: FC<PropsType> = (
  {
    currentState,
    onClose,
    targetId,
    ...modalProps
  }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const targetName = useMemo<string | undefined>(
    () => {
      return currentState === CurrentState.CATEGORIES ?
        categories.list.find((item) => item.id === targetId)?.name :
        tasks.list.find((item) => item.id === targetId)!.name;
      // eslint-disable-next-line
    }, [],
  );
  const ref = useRef<HTMLDivElement>(null);
  useTabulation(ref, 'button', 1, 2);

  /* methods */
  const handleConfirm = async () => {
    if (currentState === CurrentState.CATEGORIES) {
      await dispatch(CategoriesThunk.delete(targetId!));
      await dispatch(TasksThunk.update());
      onClose();
    } else {
      dispatch(TasksThunk.delete(targetId));
      onClose();
    }
  };


  return (
    <Modal
      className={cn()}
      title={`Удаление ${taskOrCategoryWords[currentState][0]}`}
      onClose={onClose}
      reference={ref}
      {...modalProps}
    >
      <div className={cn('body')}>
        Вы действительно хотите удалить {taskOrCategoryWords[currentState][1]} {targetName}?
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
