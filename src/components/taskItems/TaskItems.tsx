import React from 'react';
import { Task } from '../../redux/slices/tasksSlice';
import { Button } from '@mui/material';

interface TaskItemsProps {
  tasks: Task[];
  formattedDate: string;
  toggleTask: (date: string, id: string) => void;
  deleteTask: (date: string, id: string) => void;
}

const TaskItems: React.FC<TaskItemsProps> = ({ tasks, formattedDate, toggleTask, deleteTask}) => {
  return (
    <>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            className={task.completed ? 'completed' : ''}
            onClick={() => toggleTask(formattedDate, task.id)}
          >
            {task.text}
          </span>

          <Button
            className='delete'
            onClick={() => deleteTask(formattedDate, task.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </>
  );
};

export default TaskItems;