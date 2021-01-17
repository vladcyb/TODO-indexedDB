export const createOrEdit: { [key in Mode]: string[] } = {
  create: ['Создание', 'Создать'],
  edit: ['Редактирование', 'Сохранить'],
};

export const taskOrCategoryWords: { [key in ModalTargetType]: string[] } = {
  task: ['задачи', 'задачу'],
  category: ['категории', 'категорию'],
};

export const requiredFieldError = 'Поле должно быть обязательным';

export enum Mode { create = 'create', edit = 'edit' }

export enum ModalTargetType { task = 'task', category = 'category' }

export const APIErrors = {
  couldNotLoadIndexedDB: 'Не удалось загрузить хранилище данные из IndexedDB',
};
