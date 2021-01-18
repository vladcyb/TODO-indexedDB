import React, { FC, useState } from 'react';
import { Header, List } from './components';
import './App.css';
import { CurrentList } from './shared/constants';

export const App: FC = () => {

  /* state */
  const [state, setState] = useState<CurrentList>(CurrentList.TASKS);

  return (
    <div className="app">
      <Header state={state} setState={setState} />
      <div className="app__listWrapper">
        <List state={state} />
      </div>
    </div>
  );
};
