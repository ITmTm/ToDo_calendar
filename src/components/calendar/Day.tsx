import React from 'react';

import './day.scss';

interface DayProps {
  day: number;
  isHoliday: boolean;
  onClick: (day: number) => void;
}

const Day: React.FC<DayProps> = ({ day, isHoliday, onClick }) => {
  return (
    <div
      className={`day ${isHoliday ? 'holiday' : ''}`}
      onClick={() => onClick(day)}
    >
      {day}
    </div>
  );
};

export default React.memo(Day);