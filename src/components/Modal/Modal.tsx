import ReactDOM from 'react-dom';
import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = {
  className?: string
  title: string
  onClose: () => void
  open: boolean
}

export const Modal: FC<PropsType> = (props) => {

  /* props */
  const { open, onClose, title, className, children } = props;

  /* classname */
  const cn = createCn('modal', className);

  /* methods */
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  /* hooks */
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    ReactDOM.createPortal(
      open ? (
        <div className={cn()}>
          <div className={cn('content')}>
            <button className={cn('close')} onClick={onClose} />
            <div className={cn('title')}>
              {title}
            </div>
            <div className={cn('body')}>
              {children}
            </div>
          </div>
        </div>
      ) : null,
      document.getElementById('root')!,
    )
  );
};
