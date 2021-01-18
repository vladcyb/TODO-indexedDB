import React, { FC, useEffect, useRef, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { createOrEdit, ModalActionType } from '../../../shared/constants';
import { Button, Input, Modal, Select, Textarea } from '../../index';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { useInput } from '../../../shared/hooks/useInput';
import { TasksThunk } from '../../../store/tasksSlice/thunk';
import { useModal } from '../../../shared/hooks/useModal';
import './style.css';
import { listIndexMethods } from '../../../shared/methods';


const cn = createCn('modalTask');

type PropsType = {
  mode: ModalActionType
  className?: string
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
    ...modalProps
  }) => {


  /* state */
  const [categoryId, setCategoryId] = useState<number | undefined>(initialCategoryId);
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusableElements, setFocusableElements] =
    useState<NodeListOf<HTMLElement> | undefined>(undefined);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(1);


  /* hooks */
  const dispatch = useAppDispatch();
  const modalContext = useModal();
  const categories = useSelector(getCategories);
  const nameInput = useInput(initialName, true, isSubmitted);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setFocusableElements(
        ref.current.querySelectorAll(
          '.input__input, .select, textarea, .modalTask__createControl, .modalTask__closeControl, .modal__close',
        ),
      );
    }
    const tabulation = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        setFocusedButtonIndex(listIndexMethods.getPrev(focusedButtonIndex, 5));
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setFocusedButtonIndex(listIndexMethods.getNext(focusedButtonIndex, 5));
      }
    };
    window.addEventListener('keydown', tabulation);
    return () => window.removeEventListener('keydown', tabulation);
  }, [focusedButtonIndex]);

  useEffect(() => {
    if (focusableElements) {
      focusableElements[focusedButtonIndex].focus();
    }
  }, [focusedButtonIndex, focusableElements]);

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
          id: modalContext.editingId!,
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
      open
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
