import React, { FC, useContext, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit } from '../../../shared/constants';
import { Button, Input, Modal, Select, Textarea } from '../../index';
import { actions, useAppDispatch } from '../../../store';
import { ModalContext } from '../../HOCs/ModalProvider';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesReducer/selectors';
import { useInput } from '../../../shared/hooks/useInput';
import './style.css';


const cn = createCn('modalTask');

type PropsType = {
  mode: 'create' | 'edit'
  className?: string
  initialName: string
  initialDescription: string
  initialCategoryId: string | undefined
  onClose: () => void
}


export const ModalTask: FC<PropsType> = ({
                                           mode,
                                           initialName,
                                           initialDescription,
                                           initialCategoryId,
                                           onClose,
                                           ...modalProps
                                         }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useContext(ModalContext);
  const categories = useSelector(getCategories);
  const nameInput = useInput(initialName, true);

  /* state */
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState(initialDescription);

  /* vars */
  const catId = selectedCategoryId || initialCategoryId;

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (catId && nameInput.value) {
      onClose();
      if (mode === 'create') {
        dispatch(actions.tasks.addTask({
          task: {
            id: Math.random().toString(), // TODO
            name: nameInput.value,
            description,
            categoryId: catId,
          },
        }));
      } else {
        dispatch(actions.tasks.editTask({
          task: {
            id: modalContext.editingTaskId!,
            categoryId: catId,
            description,
            name: nameInput.value,
          },
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
              selectedId={catId}
              selectId={setSelectedCategoryId}
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
