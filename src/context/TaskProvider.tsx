import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskContext } from './TaskContext';
import { addTask, deleteTask, toggleTask, Task, selectTasks } from '../redux/slices/tasksSlice';

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const addNewTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const deleteExistingTask = (date: string, id: string) => {
    dispatch(deleteTask( { date, id }))
  };

  const toggleExistingTask = (date: string, id: string) => {
    dispatch(toggleTask({ date, id }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask: addNewTask, deleteTask: deleteExistingTask, toggleTask: toggleExistingTask}}>
      {children}
    </TaskContext.Provider>
  )
}