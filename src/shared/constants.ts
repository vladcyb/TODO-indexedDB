export const requiredFieldError = 'Поле должно быть обязательным';

export enum ModalActionType { CREATE = 'CREATE', EDIT = 'EDIT' }

export const createOrEdit: { [key in ModalActionType]: string[] } = {
  [ModalActionType.CREATE]: ['Создание', 'Создать'],
  [ModalActionType.EDIT]: ['Редактирование', 'Сохранить'],
};

export enum CurrentState { TASKS, CATEGORIES }

export const APIErrors = {
  couldNotLoadIndexedDB: 'Не удалось загрузить хранилище данные из IndexedDB',
};

export const taskOrCategoryWords: { [key in CurrentState]: string[] } = {
  [CurrentState.TASKS]: ['задачи', 'задачу'],
  [CurrentState.CATEGORIES]: ['категории', 'категорию'],
};

export const timeout = 0;

export enum StatusType { IDLE, LOADING }
