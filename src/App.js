import {useEffect, useState} from "react";
import Note from "./conponents/Note";
import noteService  from './services/notes'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 如何使用filter
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService
      .getAll()
      .then(res => {
        setNotes(res.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    // 对象的操作
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: false
    }
    noteService
      .create(noteObject)
      .then(res => {
        // 新增数组 concat
        setNotes(notes.concat(res.data))
        setNewNote("")
      })
  }
  // 事件中取值
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    // put
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(res => {
        console.log(res)
        setNotes(notes.map(note => note.id !== id ? note : res.data))
      })
      .catch(error => {
        console.log(error)
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => {setShowAll(!showAll)}}>show{showAll}</button>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange}/>
        <button type="submit">提交</button>
      </form>
    </div>
  )
}

export default App