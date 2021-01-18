export const requiredFieldError = 'Поле должно быть обязательным';

export enum ModalActionType { CREATE = 'CREATE', EDIT = 'EDIT' }

export const createOrEdit: { [key in ModalActionType]: string[] } = {
  [ModalActionType.CREATE]: ['Создание', 'Создать'],
  [ModalActionType.EDIT]: ['Редактирование', 'Сохранить'],
};

export enum ModalTargetType { TASK = 'TASK', CATEGORY = 'CATEGORY' }

export const APIErrors = {
  couldNotLoadIndexedDB: 'Не удалось загрузить хранилище данные из IndexedDB',
};

export const taskOrCategoryWords: { [key in ModalTargetType]: string[] } = {
  [ModalTargetType.TASK]: ['задачи', 'задачу'],
  [ModalTargetType.CATEGORY]: ['категории', 'категорию'],
};

export const timeout = 500;
