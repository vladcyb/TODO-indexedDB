import React, { Dispatch, SetStateAction, useState } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

type ListItem = {
  id?: number
  name: string
};

type PropsType = {
  placeholder: string
  list: ListItem[]
  selectedId: number | undefined
  selectId: Dispatch<SetStateAction<number | undefined>>
  className?: string
  label?: string
};

export const Select = ({
  placeholder,
  list,
  selectedId,
  selectId,
  className,
  label,
}: PropsType) => {
  /* state */
  const [isOpened, setIsOpened] = useState(false);

  /* methods */
  const toggle = () => {
    setIsOpened((value) => !value);
  };
  const handleKeyDown = () => {
    // TODO
  };

  /* classes */
  const cn = createCn('select', className);

  return (
    <div
      className={cn({ opened: isOpened })}
      onClick={toggle}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cn('label')}>
        {label}
      </label>
      <div className={cn('grid')}>
        {!selectedId ? (
          <div className={cn('title', {
            opened: isOpened,
            placeholder: true,
          })}
          >
            {placeholder}
          </div>
        ) : (
          <div className={cn('title')}>
            {list.find((item) => item.id === selectedId)!.name}
          </div>
        )}
        <div className={cn('img')}>
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0L8 8L16 0H0Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      {isOpened && (
        <div className={cn('list')}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={cn('item', { selected: !selectedId })}
            onClick={() => selectId(undefined)}
            role="button"
            tabIndex={0}
          >
            Не выбрано
          </div>
          {list.map((item) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
            <div
              className={cn('item', { selected: item.id === selectedId })}
              onClick={() => selectId(item.id)}
              title={item.name}
              key={item.id}
              role="button"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>
          {label}
        </legend>
      </fieldset>
    </div>
  );
};
