import { FC, useEffect, useState } from 'react';
import './style.css';

const getNext = (x: number) => {
  if (x === 4) {
    return 1;
  }
  return x + 1;
};

export const Preloader: FC = () => {

  /* state */
  const [spriteNumber, setSpriteNumber] = useState(1);

  /* hooks */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSpriteNumber(value => {
        return getNext(value);
      });
    }, 500);
    return () => {
      window.clearInterval(interval);
    };
  }, []);


  return (
    <div className={`Preloader Preloader_${spriteNumber}`}/>
  );
};
