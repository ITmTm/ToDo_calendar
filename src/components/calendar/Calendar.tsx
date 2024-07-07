import React, { useState, useEffect, useMemo } from 'react';
import TaskList from '../taskList/TaskList'
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isToday} from 'date-fns';
import { isDayOff } from '../../services/api'

import './calendar.scss';

const Calendar: React.FC = () => {
  const [holidays, setHolidays] = useState<Record<string, boolean>>({});

  // Получение первого и последнего для месяца
  const startOfCurrentMonth = startOfMonth(new Date())
  const endOfCurrentMonth = endOfMonth(new Date());

  // Вычисление начальной и конечной даты для отображения в календаре
  const start = startOfWeek(startOfCurrentMonth);
  const end = endOfWeek(endOfCurrentMonth);

  const days = useMemo(() => {
    const result = [];
    let day = start;
    while (day <= end) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [start, end]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const newHolidays: Record<string, boolean> = {};
      for (const date of days) {
        const formattedDate = format(date, 'yyyyMMdd');
        newHolidays[formattedDate] = await isDayOff(date);
      }
      setHolidays(newHolidays)
    };
    fetchHolidays().catch(console.error);
  }, [days]);

  return (
    <div className='calendar'>
      {days.map(date => {
        const formattedDate = format(date, 'yyyyMMdd');
        const isHoliday = holidays[formattedDate];
        const isCurrentMonth = isSameMonth(date, startOfCurrentMonth);
        const today = isToday(date);

        return (
          <div
            key={formattedDate}
            className={`calendar__day ${isHoliday ? 'calendar__day--holiday' : ''} ${isCurrentMonth ? '' : 'calendar__day--other-month'} ${today ? 'calendar__day--today' : ''}`}
          >
            <h3>{format(date, 'EEEE')}</h3>
            <p>{format(date, 'dd MMM yyyy')}</p>
            {isCurrentMonth && <TaskList date={date} />}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;