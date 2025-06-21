import { useState, useEffect } from 'react';
import './notes.css';

const NoteBoard = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  };

  const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  const addNote = () => {
    if (noteText.trim()) {
      const newNote = {
        text: noteText,
        timestamp: new Date().toLocaleString(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNoteText('');
      saveNotes();
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotes();
  };

  const handleTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const saveEdit = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = noteText;
    setNotes(updatedNotes);
    setEditingIndex(null);
    saveNotes();
  };

  const handleConfirm = () => {
    saveEdit(editingIndex);
  };

  return (
    <div className="back-note">
    <div className="note">
      <div className="note-container">
        <h2>Заметки</h2>
          <textarea
            id="noteInput"
            placeholder="Введите заметку..."
            value={noteText}
            onChange={handleTextChange}
            aria-label="Введите вашу заметку здесь"
          ></textarea>
          <button onClick={addNote} aria-label="Добавить заметку">Добавить</button>
        <div className="notes-wrapper">
          {notes.map((note, index) => (
            <div className="note" key={index}>
              <div
                className="note-text"
                contentEditable={editingIndex === index}
                suppressContentEditableWarning={true}
                onClick={() => startEditing(index)}
                style={{ cursor: editingIndex === index ? 'text' : 'pointer' }}
              >
                {note.text}
              </div>
              <div className="timestamp">{note.timestamp}</div>
              <div className="note-controls">
                <button
                  className="delete-btn"
                  onClick={() => deleteNote(index)}
                  aria-label="Удалить заметку"
                >
                  &#10060;
                </button>
                {editingIndex === index && (
                  <button
                    className="confirm-btn"
                    onClick={handleConfirm}
                    aria-label="Подтвердить изменения"
                  >
                    ✔️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
  );
};

export default NoteBoard;
