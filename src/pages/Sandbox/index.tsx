import { FC, useState } from 'react';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { ModalDelete } from '../../components/ModalDelete';
import { ModalTask } from '../../components/ModalTask';
import { ModalCategory } from '../../components/ModalCategory';

const list = [
  'first',
  'second',
  'third',
];

export const Sandbox: FC = () => {

  /* state */
  const [selectedListItem, setSelectedListItem] = useState<undefined | number>(undefined);

  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showFourthModal, setShowFourthModal] = useState(false);
  const [showFifthModal, setShowFifthModal] = useState(false);
  const [showSixthModal, setShowSixthModal] = useState(false);

  const [currentCategoryToCreate, setCurrentCategoryToCreate] = useState<undefined | number>(undefined);
  const [currentCategoryToEdit, setCurrentCategoryToEdit] = useState<undefined | number>(undefined);

  /* methods */
  const onConfirmDelete = () => {
    console.log('deleted');
  };

  const openFirstModal = () => {
    setShowFirstModal(true);
  };

  const closeFirstModal = () => {
    setShowFirstModal(false);
  };

  const openSecondModal = () => {
    setShowSecondModal(true);
  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
  };

  const openThirdModal = () => {
    setShowThirdModal(true);
  };

  const closeThirdModal = () => {
    setShowThirdModal(false);
  };

  const openFourthModal = () => {
    setShowFourthModal(true);
  };

  const closeFourthModal = () => {
    setShowFourthModal(false);
  };

  const openFifthModal = () => {
    setShowFifthModal(true);
  };

  const closeFifthModal = () => {
    setShowFifthModal(false);
  };

  const openSixthModal = () => {
    setShowSixthModal(true);
  };

  const closeSixthModal = () => {
    setShowSixthModal(false);
  };

  const onConfirm = () => {
    console.log('Confirmed');
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
          height: '1000px',
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
          <Button className="HelloButton" onClick={openFirstModal}>
            Delete category
          </Button>
          <Button onClick={openSecondModal}>
            Delete task
          </Button>
          <Button onClick={openThirdModal}>
            Create task
          </Button>
          <Button onClick={openFourthModal}>
            Edit task
          </Button>
          <Button onClick={openFifthModal}>
            Create category
          </Button>
          <Button onClick={openSixthModal}>
            Edit category
          </Button>
        </div>
      </div>
      <ModalDelete
        type="category"
        target="Категория 1"
        onClose={closeFirstModal}
        open={showFirstModal}
        onConfirm={onConfirmDelete}
      />
      <ModalDelete
        type="task"
        target="Дело 1"
        onClose={closeSecondModal}
        open={showSecondModal}
        onConfirm={onConfirmDelete}
      />
      <ModalTask
        categories={['home', 'work']}
        currentCategory={currentCategoryToCreate}
        setCategory={setCurrentCategoryToCreate}
        type="create"
        onClose={closeThirdModal}
        open={showThirdModal}
        onConfirm={onConfirm}
      />
      <ModalTask
        categories={['1', '2', '3']}
        currentCategory={currentCategoryToEdit}
        setCategory={setCurrentCategoryToEdit}
        type="edit"
        onClose={closeFourthModal}
        open={showFourthModal}
        onConfirm={onConfirm}
      />
      <ModalCategory
        onConfirm={onConfirm}
        className="Test"
        type="create"
        onClose={closeFifthModal}
        open={showFifthModal}
      />
      <ModalCategory
        onConfirm={onConfirm}
        className="Test"
        type="edit"
        onClose={closeSixthModal}
        open={showSixthModal}
      />
    </div>
  );
};
