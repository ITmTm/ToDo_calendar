import React from 'react';
import Calendar from '../calendar/Calendar';

import './app.scss';

const App: React.FC = () => {
  return (
        <div className='app'>
          <h1>To-Do List Calendar</h1>
          <Calendar />
        </div>
  )
}

export default App;
