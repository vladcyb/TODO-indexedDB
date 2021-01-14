import { Dispatch, FC, SetStateAction, useState } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type ListItem = {
  id: number
  name: string
}

type PropsType = {
  placeholder: string
  list: ListItem[]
  selectedId: number | undefined
  selectId: Dispatch<SetStateAction<number | undefined>>
  className?: string
}

export const Select: FC<PropsType> = ({
                                        placeholder,
                                        list,
                                        selectedId,
                                        selectId,
                                        className,
                                      }) => {

  /* state */
  const [isOpened, setIsOpened] = useState(false);

  /* methods */
  const toggle = () => {
    setIsOpened(value => !value);
  };

  /* classes */
  const cn = createCn('select', className);


  return (
    <div
      className={cn({ opened: isOpened })}
      onClick={toggle}
      tabIndex={0}
      role="button"
    >
      {typeof selectedId === 'undefined' ? (
        <div className={cn('title', {
          opened: isOpened,
          placeholder: true,
        })}>
          {placeholder}
        </div>
      ) : (
        <div className={cn('title')}>
          {list.find((item) => item.id === selectedId)!.name}
        </div>
      )}
      <div className={cn('img')}>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L8 8L16 0H0Z" fill="currentColor" />
        </svg>
      </div>
      {isOpened && (
        <div className={cn('list')}>
          {list.map((item) => (
            <div
              className={cn('item', { selected: item.id === selectedId })}
              onClick={() => selectId(item.id)}
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
