import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleTask, Task } from '../redux/slices/tasksSlice';
import { AppDispatch, RootState } from '../redux/store';

export const useTasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const handleDeleteTask = (date: string, id: string) => {
    dispatch(deleteTask({ date, id }));
  };

  const handleToggleTask = (date: string, id: string) => {
    dispatch(toggleTask({ date, id }))
  };

  return {
    tasks,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    toggleTask: handleToggleTask,
  };
};