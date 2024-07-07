import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TasksState {
  tasks: Record<string, Task[]>;
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ date: string; text: string }>
    ) => {
      const { date, text } = action.payload;
      const newTask: Task = {
        id: new Date().toISOString(),
        text,
        completed: false,
      };
      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }
      state.tasks[date].push(newTask);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ date: string; id: string }>
    ) => {
      const { date, id } = action.payload;
      state.tasks[date] = state.tasks[date].filter(task => task.id !== id);
    },
    completeTask: (
      state,
      action: PayloadAction<{ date: string; id: string }>
    ) => {
      const { date, id } = action.payload;
      const task = state.tasks[date].find(task => task.id === id);
      if (task) {
        task.completed = !task.completed
      }
    },
  },
})

export const { addTask, deleteTask, completeTask } = tasksSlice.actions;

export default tasksSlice.reducer;