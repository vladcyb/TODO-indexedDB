import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';

export const CategoriesThunk = (setters: SettersType) => {

  const addCategory = (category: Category) => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Categories.add(category);
    request.onsuccess = () => {
      dispatch(actions.addCategory(category));
      setters.setIsLoading(false);
    };

    request.onerror = () => {
      setters.setIsLoading(false);
      throw Error(JSON.stringify(request.result));
    };
  };

  return {
    addCategory,
  };
};
