export const createOrEdit = {
  create: ['Создание', 'Создать'],
  edit: ['Редактирование', 'Сохранить'],
};

export const taskOrCategoryWords = {
  task: ['задачи', 'задачу'],
  category: ['категории', 'категорию'],
};

export const requiredFieldError = 'Поле должно быть обязательным';

export enum Mode { create = 'create', edit = 'edit' }

export enum ModalTargetType { task = 'task', category = 'category' }
