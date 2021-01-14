import { Category } from '../../shared/types';

export type AddCategoryActionPayload = {
  category: Category
}

export type DeleteCategoryActionPayload = {
  id: string
}
