import { createContext } from 'react';
import { Task } from '../redux/slices/tasksSlice';

interface TaskContextType {
  tasks: Record<string, Task[]>;
  addTask: (task: Task) => void;
  deleteTask: (date: string, id: string) => void;
  toggleTask: (date: string, id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);