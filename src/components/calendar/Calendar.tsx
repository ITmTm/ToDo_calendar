import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Modal from '../modal/Modal'
import { isDatOff } from '../../api/isDayOffAPI';
import Day from './Day';

import './calendar.scss';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<number[]>([]);
  const currentProfile = useSelector((state: RootState) => state.profiles.currentProfile);

      // Определение количества дней в месяце
  const daysInMonth = new Date(2024, 7, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
      // Функция для проверки праздничных дней
    const checkHolidays = async () => {
      const holidayDays: number[] = [];
      for (const day of days) {
        const date = `2024-07-${day < 10 ? '0' : ''}${day}`;
        if (await isDatOff(date)) {
          holidayDays.push(day);
        }
      }
      setHolidays(holidayDays);
    };

    checkHolidays()
      .then(() => {
        console.log();
      })
      .catch((error) => {
        console.error('Error in checking holidays:', error);
      })
  }, [days]);

      // Обработчик клика по дню
  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(2024, 6, day));
  };

      // Обработчик закрытия модального окна
  const closeModal = () => {
    setSelectedDate(null)
  };

  return (
    <div className='calendar'>
      <h2>{currentProfile}&apos;s Tasks</h2>
      <div className='calendar-grid'>
        {days.map((day) => (
          <Day
            key={day}
            day={day}
            isHoliday={holidays.includes(day)}
            onClick={handleDayClick}
          />
        ))}
      </div>
      {selectedDate && (
        <Modal
          date={selectedDate}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default Calendar;