import { FC, useState } from 'react';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { ModalDelete } from '../../components/ModalDelete';

const list = [
  'first',
  'second',
  'third',
];

export const Sandbox: FC = () => {

  /* state */
  const [selectedListItem, setSelectedListItem] = useState<undefined | number>(undefined);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  /* methods */
  const openModal1 = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const onConfirmDelete = () => {
    console.log('deleted');
  };

  return (
    <div>
      <div style={{ marginBottom: '100px' }}>
        <Header />
      </div>
      <div style={{
        padding: '100px 0',
        backgroundColor: '#DBE2EF',
      }}>
        <div style={{
          margin: '50px 100px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Input placeholder="Hello" label="Label" required />
          <Input placeholder="Hello" required />
          <Input className="Hello" placeholder="Hello" label="Label" required error="Поле должно быть обязательным" />
          <Input placeholder="Hello" />
          <Input />
          <Select
            placeholder="Выберите список TODO"
            selected={selectedListItem}
            list={list}
            selectItem={setSelectedListItem}
          />
          <Button className="HelloButton" onClick={openModal1}>
            Modal 1
          </Button>
          <Button variant="secondary" onClick={openModal2}>
            Modal 2
          </Button>
        </div>
      </div>
      <ModalDelete
        type="category"
        target="Категория 1"
        onClose={closeModal1}
        open={showModal1}
        onConfirm={onConfirmDelete}
      />
      <ModalDelete
        type="task"
        target="Дело 1"
        onClose={closeModal2}
        open={showModal2}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};
