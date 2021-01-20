import ReactDOM from 'react-dom';
import { FC, RefObject, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = {
  className?: string
  title: string
  onClose: () => void
  reference?: RefObject<HTMLDivElement>
}

export const Modal: FC<PropsType> = (
  {
    onClose,
    title,
    children,
    className,
    reference,
  }) => {

  if (document.body.scrollHeight > window.innerHeight) {
    document.body.classList.add('noScroll');
  }

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
      document.body.classList.remove('noScroll');
    };
    // eslint-disable-next-line
  }, []);

  return (
    ReactDOM.createPortal(
      <div className={cn()} ref={reference}>
        <div className={cn('content')}>
          <button className={cn('close')} onClick={onClose} />
          <div className={cn('title')}>
            {title}
          </div>
          <div className={cn('body')}>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById('modal')!,
    )
  );
};
