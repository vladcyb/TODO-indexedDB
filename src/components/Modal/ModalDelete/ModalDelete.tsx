import React, { useMemo, useRef } from 'react';
import { createCn } from 'bem-react-classname';
import { Button } from '../../Button';
import { Modal } from '../Modal';
import { SectionType, taskOrCategoryWords } from '../../../shared/constants';
import { useTabulation } from '../useTabulation';
import { useAppDispatch } from '../../../store';
import { CategoriesThunk } from '../../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../../store/tasksSlice/thunk';
import { Category, Task } from '../../../shared/types';
import './style.css';

type PropsType = {
  currentState: SectionType
  onClose: () => void
  targetId: number
  tasks: Task[]
  categories: Category[]
};

const cn = createCn('modalDelete');

export const ModalDelete = ({
  currentState,
  onClose,
  targetId,
  categories,
  tasks,
}: PropsType) => {
  /* hooks */
  const dispatch = useAppDispatch();
  const targetName = useMemo<string | undefined>(
    () => (currentState === SectionType.CATEGORIES
      ? categories.find((item) => item.id === targetId)?.name
      : tasks.find((item) => item.id === targetId)!.name),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const ref = useRef<HTMLDivElement>(null);
  useTabulation(ref, 'button', 1, 2);

  /* methods */
  const handleConfirm = async () => {
    if (currentState === SectionType.CATEGORIES) {
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
    >
      <div className={cn('body')}>
        Вы действительно хотите удалить
        {' '}
        {taskOrCategoryWords[currentState][1]}
        {' '}
        {targetName}
        ?
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
