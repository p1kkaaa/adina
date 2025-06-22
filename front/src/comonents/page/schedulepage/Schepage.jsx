/* src/components/Sche.jsx */
import { useState, useEffect } from 'react'
import api from '../../../services/axiosConfig'
import './schepage.css'

const daysOfWeek = [
  'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
]

const Schepage = () => {
  const [scheduleList, setScheduleList] = useState([])
  const [currentEvent, setCurrentEvent] = useState({
    day: '', time: '', subject: '', description: ''
  })
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
      const { data } = await api.get('app/schedules/', { headers: authHeaders() })
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
        // POST на http://.../api/schedules/
        res = await api.post('app/schedules/', payload, { headers: authHeaders() })
        setScheduleList([...scheduleList, res.data])
      } else {
        // PUT на http://.../api/schedules/{id}/
        res = await api.put(
          `app/schedules/${editingEventId}/`,
          payload,
          { headers: authHeaders() }
        )
        setScheduleList(scheduleList.map(ev =>
          ev.id === editingEventId ? res.data : ev
        ))
      }
      resetForm()
    } catch (e) {
      console.error('Ошибка сохранения события:', e.response || e)
    }
  }

  const deleteEvent = async (id) => {
    try {
      // DELETE на http://.../api/schedules/{id}/
      await api.delete(`app/schedules/${id}/`, { headers: authHeaders() })
      setScheduleList(scheduleList.filter(ev => ev.id !== id))
    } catch (e) {
      console.error('Ошибка удаления события:', e.response || e)
    }
  }

  const startEdit = (ev) => {
    setEditingEventId(ev.id)
    setCurrentEvent({
      day: ev.day,
      time: ev.time,
      subject: ev.subject,
      description: ev.description || ''
    })
  }

  const resetForm = () => {
    setEditingEventId(null)
    setCurrentEvent({ day: '', time: '', subject: '', description: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentEvent({ ...currentEvent, [name]: value })
  }

  return (
    <div className="back-sche">
      <div className="container">
        <h2>Планирование расписания</h2>
        <div className="calendar-header">
          <input
            type="text" name="subject" placeholder="Тема"
            value={currentEvent.subject} onChange={handleChange}
          />
          <textarea
            name="description" placeholder="Описание"
            value={currentEvent.description} onChange={handleChange}
          />
          <input
            type="time" name="time"
            value={currentEvent.time} onChange={handleChange}
          />
          <select name="day" value={currentEvent.day} onChange={handleChange}>
            <option value="">Выберите день</option>
            {daysOfWeek.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button onClick={saveEvent}>
            {editingEventId == null ? 'Добавить событие' : 'Сохранить изменение'}
          </button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="day-container">
              <h3>{day}</h3>
              {scheduleList
                .filter(ev => ev.day === day)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(ev => (
                  <div key={ev.id} className="time-block">
                    <span className="time">{ev.time}</span>
                    <span className="subject">{ev.subject}</span>
                    <span className="description">{ev.description}</span>
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
