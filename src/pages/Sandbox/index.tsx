import { FC, useState } from 'react';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

const list = [
  'first',
  'second',
  'third',
];

export const Sandbox: FC = () => {

  /* state */
  const [selectedListItem, setSelectedListItem] = useState<undefined | number>(undefined);

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
          <Input placeholder="Hello" label="Label" required error="Поле должно быть обязательным" />
          <Input placeholder="Hello" />
          <Input />
          <Select
            placeholder="Выберите список TODO"
            selected={selectedListItem}
            list={list}
            selectItem={setSelectedListItem}
          />
          <Button>Click me!</Button>
          <Button variant="secondary">Click me!</Button>
        </div>
      </div>
    </div>
  );
};
