import React, { FC, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { Button, Input, Modal, Textarea } from '../../index';
import { createOrEdit, Mode } from '../../../shared/constants';
import { useAppDispatch } from '../../../store';
import { useInput } from '../../../shared/hooks/useInput';
import { useModal } from '../useModal';
import { useSetters } from '../../../shared/hooks/useSetters';
import { CategoriesThunk } from '../../../store/categoriesReducer/thunk';
import './style.css';


type PropsType = {
  mode: Mode
  initialName?: string
  initialDescription?: string
  onClose: () => void
  className?: string
}

export const ModalCategory: FC<PropsType> = ({
                                               mode,
                                               className,
                                               initialName = '',
                                               initialDescription = '',
                                               onClose,
                                               ...modalProps
                                             }) => {

  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useModal();
  const nameField = useInput(initialName, true);

  /* thunk */
  const [getters, setters] = useSetters();
  const categoriesThunk = CategoriesThunk(setters);

  /* classes */
  const cn = createCn('modalCategory', className);

  /* state */
  const [description, setDescription] = useState(initialDescription);

  /* methods */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameField.value;
    if (name) {
      if (mode === Mode.create) {
        dispatch(categoriesThunk.add({
          name,
          description,
        }));
      } else {
        dispatch(categoriesThunk.edit({
          id: modalContext.editingId!,
          name: nameField.value,
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
      open
      {...modalProps}
    >
      <form onSubmit={handleConfirm}>
        <Input
          className={cn('name')}
          label="Имя"
          placeholder="Введите имя категории"
          autoFocus
          {...nameField}
        />
        <Textarea
          className={cn('description')}
          label="Описание"
          placeholder="Введите описание категории"
          onChange={handleDescriptionChange}
          value={description}
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
