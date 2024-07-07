import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../redux/slices/tasksSlice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface TaskModalProps {
  date: Date;
  onClose: () => void;
  open: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ date, onClose, open }) => {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useTasks();
  const formattedDate = date.toISOString().split('T')[0];

  const handleAddTask = () => {
    if (taskText.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
        date: formattedDate,
      };
      addTask(task);
      setTaskText('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='New Task'
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>

        <Button onClick={handleAddTask} color='primary'>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;