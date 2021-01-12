import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTodoPayloadType, Todo } from './types';


type StateType = Todo[]

const initialState: StateType = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<AddTodoPayloadType>) => {
      state.push(payload.todo);
    },
  },
});

export const { actions } = todosSlice;
