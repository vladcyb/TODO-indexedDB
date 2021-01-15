import { FC, useEffect, useState } from 'react';
import './style.css';

const getNext = (x: number) => {
  if (x === 4) {
    return 1;
  }
  return x + 1;
};

export const Preloader: FC = () => {

  const [state, setState] = useState(1);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(value => {
        return getNext(value);
      });
    }, 500);
    return () => {
      window.clearInterval(interval);
    };
  }, []);


  return (
    <div className={`Preloader Preloader_${state}`}/>
  );
};
