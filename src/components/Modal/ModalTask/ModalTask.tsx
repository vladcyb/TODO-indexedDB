import React, { FC, useRef, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit, ModalActionType } from '../../../shared/constants';
import { Button, Input, Modal, Select, Textarea } from '../../index';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { useInput } from '../../../shared/hooks/useInput';
import { TasksThunk } from '../../../store/tasksSlice/thunk';
import { useTabulation } from '../useTabulation';
import './style.css';


const cn = createCn('modalTask');

type PropsType = {
  mode: ModalActionType
  className?: string
  id?: number
  initialName?: string
  initialDescription?: string
  initialCategoryId?: number
  onClose: () => void
}


export const ModalTask: FC<PropsType> = (
  {
    mode,
    initialName = '',
    initialDescription = '',
    initialCategoryId,
    onClose,
    id,
    ...modalProps
  }) => {

  /* state */
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();
  const categories = useSelector(getCategories).list;
  const nameInput = useInput(initialName, true, isSubmitted);
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
      {...modalProps}
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
