/* src/components/Reminders.jsx */
import { useState, useEffect } from 'react'
import api from '../../../services/axiosConfig'
import './../notes/notes.css'

const Reminders = () => {
  const [reminders, setReminders] = useState([])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)

  const authHeaders = () => {
    const token = localStorage.getItem('access_token')
    return { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = async () => {
    try {
      const { data } = await api.get('reminders/', { headers: authHeaders() })
      setReminders(data)
    } catch (e) {
      console.error('Ошибка загрузки напоминаний:', e.response || e)
    }
  }

  const saveReminder = async () => {
    if (!text.trim()) return
    try {
      let res
      if (editingId == null) {
        res = await api.post(
          'reminders/',
          { text },
          { headers: authHeaders() }
        )
        setReminders([...reminders, res.data])
      } else {
        res = await api.put(
          `reminders/${editingId}/`,
          { text },
          { headers: authHeaders() }
        )
        setReminders(reminders.map(r =>
          r.id === editingId ? res.data : r
        ))
      }
      setText('')
      setEditingId(null)
    } catch (e) {
      console.error('Ошибка сохранения напоминания:', e.response || e)
    }
  }

  const startEdit = (r) => {
    setEditingId(r.id)
    setText(r.text)
  }

  const deleteReminder = async (id) => {
    try {
      await api.delete(`reminders/${id}/`, { headers: authHeaders() })
      setReminders(reminders.filter(r => r.id !== id))
    } catch (e) {
      console.error('Ошибка удаления напоминания:', e.response || e)
    }
  }

  return (
    <div className="back-note">
      <div className="note-container">
        <h2>Напоминания</h2>
        <div className="reminder-form">
          <input
            type="text" placeholder="Текст напоминания..."
            value={text} onChange={e => setText(e.target.value)}
          />
          <button onClick={saveReminder}>
            {editingId == null ? 'Добавить' : 'Сохранить'}
          </button>
        </div>
        <ul className="reminders-list">
          {reminders.map(r => (
            <li key={r.id}>
              {r.text}
              <button onClick={() => startEdit(r)}>✏️</button>
              <button onClick={() => deleteReminder(r.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Reminders
