import React, { useState } from 'react';
import './schedule.css'; // Подключаем стили

const WeeklySchedule = () => {
  const initialSchedule = {
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
    Воскресенье: [],
  };

  const [schedule, setSchedule] = useState(initialSchedule);
  const [currentEvent, setCurrentEvent] = useState({
    day: '',
    time: '',
    subject: '',
    description: '',
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const handleAddEvent = () => {
    if (currentEvent.day && currentEvent.time && currentEvent.subject) {
      // Сортируем события по времени перед добавлением
      const sortedEvents = [...schedule[currentEvent.day], {
        time: currentEvent.time,
        subject: currentEvent.subject,
        description: currentEvent.description,
      }].sort((a, b) => a.time.localeCompare(b.time)); // Сортируем по времени

      setSchedule({
        ...schedule,
        [currentEvent.day]: sortedEvents,
      });
      setCurrentEvent({ day: '', time: '', subject: '', description: '' });
    }
  };

  return (
    <div className="schedule">
      <div className="container">

      <div className="calendar-header">
        <h2>Планирование расписания</h2>
        <input
          type="text"
          name="subject"
          placeholder="..."
          value={currentEvent.subject}
          onChange={handleEventChange}
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={currentEvent.description}
          onChange={handleEventChange}
        />
        <input
          type="time"
          name="time"
          value={currentEvent.time}
          onChange={handleEventChange}
        />
        <select
          name="day"
          value={currentEvent.day}
          onChange={handleEventChange}
        >
          <option value="">Выберите день</option>
          {Object.keys(initialSchedule).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button onClick={handleAddEvent}>Добавить событие</button>
      </div>

      <div className="calendar-grid">
        {Object.keys(schedule).map((day) => (
          <div key={day} className="day-container">
            <div className="day-header">
              <h3>{day}</h3>
            </div>
            <div className="time-blocks">
              {schedule[day].map((event, index) => (
                <div key={index} className="time-block">
                  <span className="time">{event.time}</span>
                  <span className="subject">{event.subject}</span>
                  <span className="description">{event.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
