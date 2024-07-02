import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Modal from '../modal/Modal'
import { isDatOff } from '../../api/isDayOffAPI';

import './calendar.scss';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<number[]>([]);
  const currentProfile = useSelector((state: RootState) => state.profiles.currentProfile);

  const daysInMonth = new Date(2024, 7, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
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
        console.log()
      })
      .catch((error) => {
        console.error('Error in checking holidays:', error);
      })
  }, [days]);

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(2024, 6, day));
  };

  const closeModal = () => {
    setSelectedDate(null)
  };

  return (
    <div className='calendar'>
      <h2>{currentProfile}&apos;s Tasks</h2>
      {days.map((day) => (
        <div
          key={day}
          className={`day ${holidays.includes(day) ? 'holiday' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      ))}
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