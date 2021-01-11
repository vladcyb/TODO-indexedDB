import { Dispatch, FC, SetStateAction, useState } from 'react';
import './style.css';
import cn from 'classnames';

type PropsType = {
  placeholder: string
  selected: number | undefined
  list: string[]
  selectItem: Dispatch<SetStateAction<undefined | number>>
}

const Select: FC<PropsType> = (props) => {

  /* props */
  const { placeholder, list, selected, selectItem } = props;

  /* state */
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      className={cn('Select', { Select_opened: isOpened })}
      onClick={() => setIsOpened(value => !value)}
      tabIndex={0}
      role="button"
    >
      {typeof selected === 'undefined' ? (
        <div className="Select__title Select__title_default">{placeholder}</div>
      ) : (
        <div className="Select__title">{list[selected]}</div>
      )}
      <div className="Select__img">
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L8 8L16 0H0Z" fill="currentColor" />
        </svg>
      </div>
      {isOpened && (
        <div className="Select__list">
          {list.map((item, index) => (
            <div className={cn(
              'Select__listItem',
              { Select__listItem_selected: index === selected },
            )}
                 onClick={() => selectItem(index)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
