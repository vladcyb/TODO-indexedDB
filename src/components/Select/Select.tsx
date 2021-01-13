import { Dispatch, FC, SetStateAction, useState } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


type PropsType = {
  placeholder: string
  selected: number | undefined
  list: string[]
  selectItem: Dispatch<SetStateAction<undefined | number>>
  className?: string
}

export const Select: FC<PropsType> = ({
                                        placeholder,
                                        list,
                                        selected,
                                        selectItem,
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
      {typeof selected === 'undefined' ? (
        <div className={cn('title', {
          opened: isOpened,
          placeholder: true,
        })}>
          {placeholder}
        </div>
      ) : (
        <div className={cn('title')}>{list[selected]}</div>
      )}
      <div className={cn('img')}>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L8 8L16 0H0Z" fill="currentColor" />
        </svg>
      </div>
      {isOpened && (
        <div className={cn('list')}>
          {list.map((item, index) => (
            <div
              className={cn('item', { selected: index === selected })}
              onClick={() => selectItem(index)}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
