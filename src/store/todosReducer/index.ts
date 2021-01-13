import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTodoPayloadType, DeleteTodoPayloadType } from './types';
import { Todo } from '../../shared/types';


const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<AddTodoPayloadType>) => {
      state.push(payload.todo);
    },
    deleteTodo: (state, { payload }: PayloadAction<DeleteTodoPayloadType>) => {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state.splice(
          index, 1,
        );
      }
    },
  },
});

export const actions = todosSlice.actions;
