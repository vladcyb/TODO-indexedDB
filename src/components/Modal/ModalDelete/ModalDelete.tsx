import { FC, useMemo, useRef } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Modal } from '../../index';
import { ModalTargetType, taskOrCategoryWords } from '../../../shared/constants';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { useTabulation } from '../useTabulation';
import './style.css';


type PropsType = {
  type: ModalTargetType
  onClose: () => void
  targetId: number
}

const cn = createCn('modalDelete');


export const ModalDelete: FC<PropsType> = (
  {
    type,
    onClose,
    targetId,
    ...modalProps
  }) => {

  /* hooks */
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const targetName = useMemo<string | undefined>(
    () => {
      return type === ModalTargetType.CATEGORY ?
        categories.list.find((item) => item.id === targetId)?.name :
        tasks.list.find((item) => item.id === targetId)!.name;
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
