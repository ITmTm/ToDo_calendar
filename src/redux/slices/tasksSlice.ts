import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

interface TasksState {
  [key: string]: Task[];
}

const initialState: TasksState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const { date } = action.payload;
      if (!state[date]) {
        state[date] = [];
      }
      state[date].push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<{ date: string, id: string }>) => {
      const { date, id } = action.payload;
      state[date] = state[date].filter(task => task.id !== id);
    },
    toggleTask: (state, action: PayloadAction<{ date: string, id: string }>) => {
      const { date, id } = action.payload;
      const task = state[date].find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks;
export default tasksSlice.reducer;