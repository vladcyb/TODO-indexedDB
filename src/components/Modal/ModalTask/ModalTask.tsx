import React, { FC, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit, Mode } from '../../../shared/constants';
import { Button, Input, Modal, Select, Textarea } from '../../index';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesReducer/selectors';
import { useInput } from '../../../shared/hooks/useInput';
import { useModal } from '../useModal';
import { useSetters } from '../../../shared/hooks/useSetters';
import { TasksThunk } from '../../../store/tasksReducer/thunk';
import './style.css';


const cn = createCn('modalTask');

type PropsType = {
  mode: Mode
  className?: string
  initialName?: string
  initialDescription?: string
  initialCategoryId?: number
  onClose: () => void
}


export const ModalTask: FC<PropsType> = ({
                                           mode,
                                           initialName = '',
                                           initialDescription = '',
                                           initialCategoryId,
                                           onClose,
                                           ...modalProps
                                         }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useModal();
  const categories = useSelector(getCategories);
  const nameInput = useInput(initialName, true);

  /* thunk */
  const [getters, setters] = useSetters();
  const thunk = TasksThunk(setters);

  /* state */
  const [categoryId, setCategoryId] = useState<number | undefined>(initialCategoryId);
  const [description, setDescription] = useState(initialDescription);

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryId && nameInput.value) {
      onClose();
      if (mode === Mode.create) {
        dispatch(thunk.addTask({
          name: nameInput.value,
          description,
          categoryId,
        }));

      } else {
        dispatch(thunk.editTask({
          id: modalContext.editingId!,
          categoryId,
          description,
          name: nameInput.value,
        }));
      }
    }
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[mode][0]} задачи`}
      onClose={onClose}
      open
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
              {...nameInput}
            />
            <Select
              className={cn()}
              placeholder="Выберите категорию"
              list={categories}
              selectedId={categoryId}
              selectId={setCategoryId}
            />
            <Textarea
              className={cn('description')}
              placeholder="Введите описание задачи"
              value={description}
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
