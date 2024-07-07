import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskItems from '../taskItems/TaskItems';
import TaskModal from '../taskModal/TaskModal';
import { Button } from '@mui/material';

import './taskList.scss';

interface TaskListProps {
  date: Date;
}

const TaskList: React.FC<TaskListProps> = ({ date }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const formattedDate = date.toISOString().split('T')[0];
  const { tasks } = useTasks();
  const dayTasks = tasks[formattedDate] || [];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='task-list'>
      <ul style={{ display: dayTasks.length ? 'block' : 'none' }}>
        <TaskItems
          tasks={dayTasks}
          formattedDate={formattedDate}
          toggleTask={useTasks().toggleTask}
          deleteTask={useTasks().deleteTask}
        />
      </ul>

      <Button
        variant='contained'
        color='primary'
        onClick={openModal}
      >
        Add Task
      </Button>

      <TaskModal
        date={date}
        onClose={closeModal}
        open={modalOpen}
      />
    </div>
  );
};

export default TaskList;