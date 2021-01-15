import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category, MyIDBResponse } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';


export const CategoriesThunk = (setters: SettersType) => {

  const add = (category: Category) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.add(category) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.addCategory({
        id: request.request.result,
        ...category,
      }));
    }
    setters.setIsLoading(false);
  };

  const put = (category: Required<Category>) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.put(category) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.editCategory(category));
    }
    setters.setIsLoading(false);
  };

  const drop = (id: number) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.drop(id) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.deleteCategory(id));
    }
    setters.setIsLoading(false);
  };

  return {
    add,
    put,
    drop,
  };
};
