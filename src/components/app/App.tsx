import React from 'react';
import ParentComponent from '../parentComponent/ParentComponent';
import { TaskProvider } from '../../context/TaskProvider';

import './app.scss';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className='app'>
        <header className='header'>
          <h1>To-Do Task Calendar</h1>
        </header>
        <div className='content'>
          <ParentComponent />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;