export const requiredFieldError = 'Поле должно быть обязательным';

export enum ModalActionType { CREATE = 'CREATE', EDIT = 'EDIT' }

export const createOrEdit: { [key in ModalActionType]: string[] } = {
  [ModalActionType.CREATE]: ['Создание', 'Создать'],
  [ModalActionType.EDIT]: ['Редактирование', 'Сохранить'],
};

export enum SectionType { TASKS, CATEGORIES }

export const APIErrors = {
  couldNotLoadIndexedDB: 'Не удалось загрузить данные из IndexedDB',
};

export const taskOrCategoryWords: { [key in SectionType]: string[] } = {
  [SectionType.TASKS]: ['задачи', 'задачу'],
  [SectionType.CATEGORIES]: ['категории', 'категорию'],
};

export const timeout = 200;

export enum LoadingStatusType { IDLE, LOADING }

export type ModalStateType = {
  isCreatingTask: boolean
  isCreatingCategory: boolean
  editingCategoryId: undefined | number
  editingTaskId: undefined | number
  deletingCategoryId: undefined | number
  deletingTaskId: undefined | number
};

export type EditTaskModalStateType = {
  categoryId: undefined | number
  name: string
  description: string
};

export type EditCategoryModalStateType = {
  name: string
  description: string
};
