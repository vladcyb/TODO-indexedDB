import React, { useRef, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit, EditTaskModalStateType, ModalActionType } from '../../../shared/constants';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Modal } from '../Modal';
import { Textarea } from '../../Textarea';
import { useAppDispatch } from '../../../store';
import { useInput } from '../../../shared/hooks/useInput';
import { TasksThunk } from '../../../store/tasksSlice/thunk';
import { useTabulation } from '../useTabulation';
import { Category } from '../../../shared/types';
import './style.css';

const cn = createCn('modalTask');

type PropsType = {
  mode: ModalActionType
  id?: number
  onClose: () => void
  categories: Category[]
  initialState?: EditTaskModalStateType
};

export const ModalTask = ({
  mode,
  onClose,
  id,
  initialState,
  categories,
}: PropsType) => {
  /* state */
  const [categoryId, setCategoryId] = useState<number | undefined>(initialState?.categoryId);
  const [description, setDescription] = useState<string>(initialState?.description || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();
  const nameInput = useInput(initialState?.name, true, isSubmitted);
  const ref = useRef<HTMLDivElement>(null);
  useTabulation(
    ref,
    '.input__input, .select, textarea, .modalTask__createControl, .modalTask__closeControl, .modal__close',
    1,
    5,
  );

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const { value: name } = nameInput;
    if (name) {
      onClose();
      if (mode === ModalActionType.CREATE) {
        dispatch(TasksThunk.add({
          name,
          description,
          categoryId,
        }));
      } else {
        dispatch(TasksThunk.edit({
          id: id!,
          categoryId,
          description,
          name,
        }));
      }
    }
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[mode][0]} задачи`}
      onClose={onClose}
      reference={ref}
    >
      <form onSubmit={handleConfirm}>
        <div className={cn('body')}>
          <div className={cn('grid')}>
            <Input
              className={cn('name')}
              label="Имя"
              placeholder="Введите имя задачи"
              autoFocus
              maxLength={255}
              {...nameInput}
            />
            <Select
              className={cn('select')}
              placeholder="Выберите категорию"
              list={categories}
              selectedId={categoryId}
              selectId={setCategoryId}
              label="Категория"
            />
            <Textarea
              className={cn('description')}
              label="Описание"
              placeholder="Введите описание задачи"
              value={description}
              maxLength={1536}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className={cn('controls')}>
          <Button
            className={cn('createControl')}
            type="submit"
          >
            {createOrEdit[mode][1]}
          </Button>
          <Button
            className={cn('closeControl')}
            variant="secondary"
            onClick={onClose}
          >
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
