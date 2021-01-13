import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTodoPayloadType } from './types';
import { Todo } from '../../shared/types';


const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<AddTodoPayloadType>) => {
      state.push(payload.todo);
    },
  },
});

export const actions = todosSlice.actions;
