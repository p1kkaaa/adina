/* src/components/Sche.jsx */
import { useState, useEffect } from 'react'
import api from '../../../services/axiosConfig'
import './schepage.css'

const daysOfWeek = [
  'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

const Schepage = () => {
  const initialEvent = {
    day_of_week: '',
    start_time: '',
    end_time: '',
    subject: '',
    teacher: '',
    classroom: '',
    is_recurring: false,
  }

  const [scheduleList, setScheduleList] = useState([])
  const [currentEvent, setCurrentEvent] = useState(initialEvent)
  const [editingEventId, setEditingEventId] = useState(null)

  const authHeaders = () => {
    const token = localStorage.getItem('access_token')
    return { Authorization: `JWT ${token}` }
  }

  useEffect(() => {
    loadSchedules()
  }, [])

  const loadSchedules = async () => {
    try {
      // <-- Здесь именно api.get('schedules/')
      const { data } = await api.get('schedules/', {
        headers: authHeaders()
      })
      setScheduleList(data)
    } catch (e) {
      console.error('Ошибка загрузки расписания:', e.response || e)
    }
  }

  const saveEvent = async () => {
    const payload = { ...currentEvent }
    try {
      let res
      if (editingEventId == null) {
        // <-- POST на .../api/schedules/
        res = await api.post('schedules/', payload, {
          headers: authHeaders()
        })
        setScheduleList(prev => [...prev, res.data])
      } else {
        // <-- PUT на .../api/schedules/{id}/
        res = await api.put(
          `schedules/${editingEventId}/`,
          payload,
          { headers: authHeaders() }
        )
        setScheduleList(prev =>
          prev.map(ev => ev.id === editingEventId ? res.data : ev)
        )
      }
      resetForm()
    } catch (e) {
      console.error('Ошибка сохранения события:', e.response || e)
    }
  }

  const deleteEvent = async (id) => {
    try {
      // <-- DELETE на .../api/schedules/{id}/
      await api.delete(`schedules/${id}/`, { headers: authHeaders() })
      setScheduleList(prev => prev.filter(ev => ev.id !== id))
    } catch (e) {
      console.error('Ошибка удаления события:', e.response || e)
    }
  }

  const startEdit = (ev) => {
    setEditingEventId(ev.id)
    setCurrentEvent({
      day_of_week:  ev.day_of_week   || '',
      start_time:   ev.start_time    || '',
      end_time:     ev.end_time      || '',
      subject:      ev.subject       || '',
      teacher:      ev.teacher       || '',
      classroom:    ev.classroom     || '',
      is_recurring: !!ev.is_recurring
    })
  }

  const resetForm = () => {
    setEditingEventId(null)
    setCurrentEvent(initialEvent)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="back-sche">
      <div className="container">
        <h2>Планирование расписания</h2>

        <div className="calendar-header">
          <select
            name="day_of_week"
            value={currentEvent.day_of_week}
            onChange={handleChange}
          >
            <option value="">Выберите день</option>
            {daysOfWeek.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <input
            type="time"
            name="start_time"
            value={currentEvent.start_time}
            onChange={handleChange}
          />
          <input
            type="time"
            name="end_time"
            value={currentEvent.end_time}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Тема"
            value={currentEvent.subject}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacher"
            placeholder="Преподаватель"
            value={currentEvent.teacher}
            onChange={handleChange}
          />
          <input
            type="text"
            name="classroom"
            placeholder="Аудитория"
            value={currentEvent.classroom}
            onChange={handleChange}
          />

          <label>
            Повторяется
            <input
              type="checkbox"
              name="is_recurring"
              checked={currentEvent.is_recurring}
              onChange={handleChange}
            />
          </label>

          <button onClick={saveEvent}>
            {editingEventId == null ? 'Добавить событие' : 'Сохранить изменение'}
          </button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="day-container">
              <h3>{day}</h3>
              {scheduleList
                .filter(ev => ev.day_of_week === day)
                .sort((a, b) => a.start_time.localeCompare(b.start_time))
                .map(ev => (
                  <div key={ev.id} className="time-block">
                    <span className="time">
                      {ev.start_time}–{ev.end_time}
                    </span>
                    <span className="subject">{ev.subject}</span>
                    <span className="teacher">{ev.teacher}</span>
                    <span className="classroom">{ev.classroom}</span>
                    <span className="recurring">
                      {ev.is_recurring ? 'Да' : 'Нет'}
                    </span>
                    <button onClick={() => startEdit(ev)}>✏️</button>
                    <button onClick={() => deleteEvent(ev.id)}>❌</button>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Schepage
