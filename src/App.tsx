import React, { FC } from 'react';
import { Header, List } from './components';
import './App.css';

export const App: FC = () => (
  <div className="app">
    <Header />
    <div className="app__listWrapper">
      <List />
    </div>
  </div>
);
