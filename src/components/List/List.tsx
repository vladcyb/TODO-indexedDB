import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksSlice/selectors';
import { getAppState } from '../../store/appSlice/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { Preloader } from '../../Preloader';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import './style.css';


const cn = createCn('list');


export const List: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AppThunk.update());
  }, []);


  return (
    <div className={cn()}>
      {/*TODO*/}
      {false && (
        <div className={cn('preloader')}>
          <Preloader />
        </div>
      )}
      {state === 'tasks' ? (
        tasks.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      ) : (
        categories.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      )}
    </div>
  );
};
