import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';
import { AppThunk } from '../appSlice/thunk';


export const CategoriesThunk = (setters: SettersType) => {

  const add = (category: Category) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.add(category);
    if (request.ok) {
      dispatch(actions.addCategory({
        id: request.id as number,
        ...category,
      }));
    }
    setters.setIsLoading(false);
  };

  const edit = (category: Required<Category>) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.edit(category);
    if (request.ok) {
      dispatch(actions.editCategory(category));
    }
    setters.setIsLoading(false);
  };

  const drop = (id: number) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.drop(id);
    if (request.ok) {
      dispatch(actions.deleteCategory(id));
      dispatch(AppThunk.update());
    }
    setters.setIsLoading(false);
  };

  return {
    add,
    edit,
    drop,
  };
};
