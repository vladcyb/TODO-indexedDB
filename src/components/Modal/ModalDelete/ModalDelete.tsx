import { FC, useMemo, useRef } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../index';
import { ModalTargetType, taskOrCategoryWords } from '../../../shared/constants';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { useModal } from '../../../shared/hooks/useModal';
import { useTabulation } from '../useTabulation';
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
  const { deletingId } = useModal();
  const dispatch = useAppDispatch();
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const targetName = useMemo<string | undefined>(
    () => {
      return type === ModalTargetType.CATEGORY ?
        categories.list.find((item) => item.id === deletingId)?.name :
        tasks.list.find((item) => item.id === deletingId)!.name;
      // eslint-disable-next-line
    }, [],
  );
  const ref = useRef<HTMLDivElement>(null);
  useTabulation(ref, 'button', 1, 2);

  /* methods */
  const handleConfirm = async () => {
    // if (state === CurrentList.TASKS) {
    //   dispatch(TasksThunk.delete(deletingId!));
    //   onClose();
    // } else {
    //   await dispatch(CategoriesThunk.delete(deletingId!));
    //   await dispatch(TasksThunk.update());
    //   onClose();
    // }
  };


  return (
    <Modal
      className={cn()}
      title={`Удаление ${taskOrCategoryWords[type][0]}`}
      onClose={onClose}
      open
      reference={ref}
      {...modalProps}
    >
      <div className={cn('body')}>
        Вы действительно хотите удалить {taskOrCategoryWords[type][1]} {targetName}?
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
