import { Dispatch, FC, SetStateAction } from 'react';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { createCn } from 'bem-react-classname';
import { Select } from '../Select';
import './style.css';
import { Textarea } from '../Textarea';
import { Button } from '../Button';


const cn = createCn('modalTask');

type PropsType = {
  type: 'create' | 'edit'
  onClose: () => void
  open: boolean
  className?: string
  currentCategory: number | undefined
  setCategory: Dispatch<SetStateAction<undefined | number>>
  categories: string[]
  onConfirm: () => void
}

const verbs = {
  create: ['Создание', 'Создать'],
  edit: ['Редактирование', 'Сохранить'],
};

export const ModalTask: FC<PropsType> = ({
                                           type,
                                           setCategory,
                                           categories,
                                           currentCategory,
                                           onConfirm,
                                           ...modalProps
                                         }) => (
  <Modal
    className={cn()}
    title={`${verbs[type][0]} задачи`}
    {...modalProps}
  >
    <div className={cn('body')}>
      <div className={cn('grid')}>
        <Input
          className={cn('name')}
          label="Имя"
          placeholder="Введите имя задачи"
          required
        />
        <Select
          className={cn('category')}
          placeholder="Выберите категорию"
          list={categories}
          selectItem={setCategory}
          selected={currentCategory}
        />
        <Textarea className={cn('description')} />
      </div>
    </div>
    <div className={cn('controls')}>
      <Button className={cn('createControl')} onClick={onConfirm}>
        {verbs[type][1]}
      </Button>
      <Button
        className={cn('closeControl')}
        variant="secondary"
        onClick={modalProps.onClose}
      >
        Закрыть
      </Button>
    </div>
  </Modal>
);
