import React, { useRef, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Modal } from '../Modal';
import { Textarea } from '../../Textarea';
import { createOrEdit, EditCategoryModalStateType, ModalActionType } from '../../../shared/constants';
import { useAppDispatch } from '../../../store';
import { useInput } from '../../../shared/hooks/useInput';
import { CategoriesThunk } from '../../../store/categoriesSlice/thunk';
import { useTabulation } from '../useTabulation';
import './style.css';

type PropsType = {
  id?: number
  mode: ModalActionType
  onClose: () => void
  initialState?: EditCategoryModalStateType
};

const cn = createCn('modalCategory');

export const ModalCategory = ({
  mode,
  onClose,
  id,
  initialState,
}: PropsType) => {
  /* state */
  const [description, setDescription] = useState<string>(initialState?.description || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* hooks */
  const dispatch = useAppDispatch();
  const nameField = useInput(initialState?.name || '', true, isSubmitted);
  const ref = useRef<HTMLDivElement>(null);
  useTabulation(ref, 'input, textarea, button', 1, 4);

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { value: name } = nameField;
    if (name) {
      if (mode === ModalActionType.CREATE) {
        dispatch(CategoriesThunk.add({
          name,
          description,
        }));
      } else {
        dispatch(CategoriesThunk.edit({
          id: id!,
          name,
          description,
        }));
      }
      onClose();
    }
  };

  return (
    <Modal
      className={cn()}
      title={`${createOrEdit[mode][0]} категории`}
      onClose={onClose}
      reference={ref}
    >
      <form onSubmit={handleConfirm}>
        <Input
          className={cn('name')}
          label="Имя"
          placeholder="Введите имя категории"
          autoFocus
          maxLength={255}
          name="name"
          {...nameField}
        />
        <Textarea
          className={cn('description')}
          label="Описание"
          placeholder="Введите описание категории"
          onChange={handleDescriptionChange}
          value={description}
          maxLength={512}
        />
        <div className={cn('controls')}>
          <Button className={cn('confirm')} type="submit">
            {createOrEdit[mode][1]}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
