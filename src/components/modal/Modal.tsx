import React, { useState } from 'react';

import './modal.scss';

interface ModalProps {
  date: Date;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const handleCompleteTask = (index: number) => {
    const updateTasks = tasks.map((task, i) =>
      i === index ? `✔️ ${task} ` : task
    );
    setTasks(updateTasks);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='modal-close' onClick={onClose}>
          &times;
        </span>
        <h2>Tasks for {date.toDateString()}</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='New task'
        />
        <button onClick={handleAddTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span style={{marginRight: 30, fontSize: 16}}>{task}</span>
              <button onClick={() => handleCompleteTask(index)}>Complete</button>
              <button className='modal-del' onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;