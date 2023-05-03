# Part2

#### 表单

```react
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}

// 事件处理程序立即调用event.preventDefault()方法，防止提交表单的默认动作。默认动作会，忽略其他操作，导致页面重新加载。
// 防止刷新
```

#### 受控组件

通常会根据用户的输入来进行更新。即，不同时候使用 value 属性会得到当前状态下用户**直接输入**的值。

```javascript
// 受控组件
<input type="text" value={newNote} onChange={handleChange}/>
```

#### 较为复杂的场景

```react
// App.js
import {useState} from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 如何使用filter
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault();
    // 对象的操作  
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: false
    }
    // 新增数组 concat
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }
  // 事件中取值
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
        // 事件处理函数    
      <button onClick={() => {setShowAll(!showAll)}}>show{showAll ? true : false}</button>
      <ul>
        {
          // 如何使用map
          notesToShow.map(note => {
            return <li key={note.id}>{note.content}</li>
          })
        }
      </ul>
      // 原生表单操作    
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange}/>
        <button type="submit">提交</button>
      </form>
    </div>
  )
}

export default App
```

```react
// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy1',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript2',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
```

#### reduce 数组中含有对象的相加

```react
  const getSum = (parts) => {
     // prev 最后的结果 cur 当前对象 0 代表从什么时候开始加
      return parts.reduce((prev, cur ) => {
        console.log(prev, cur)
        return cur.exercises + prev
      }, 0)
  }
```

https://juejin.cn/post/6844903966145413128

#### useEffect

*默认情况下，效果会在每次完成渲染后运行，但你可以选择只在某些值发生变化时启动它。*

```react
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])

// useEffect的第二个参数用于指定效果的运行频率。如果第二个参数是一个空的数组[]，那么效果就只在组件的第一次渲染时运行。
```

#### Post Put

```react
import {useEffect, useState} from "react";
import Note from "./conponents/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 如何使用filter
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
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
    axios
      .post('http://localhost:3001/notes', noteObject)
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
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    axios
      .put(url, changedNote)
      .then(res => {
        console.log(res)
        setNotes(notes.map(note => note.id !== id ? note : res.data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => {setShowAll(!showAll)}}>show{showAll ? true : false}</button>
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
```

#### Note.js

```react
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
```

#### 最终代码

```react
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
```

```react
import '../index.css'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
```

```react
import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll,
  create,
  update
}
```
### REST

在REST术语中，我们把单个数据对象，如我们应用中的笔记，称为*资源*。**每个资源都有一个与之相关的唯一地址--它的URL**

对URL *notes/3*的HTTP GET请求将返回ID为3的笔记。对*notes* URL的HTTP GET请求将返回所有笔记的列表。

*notes* URL发出HTTP POST请求来创建一个用于存储笔记的新资源。新笔记资源的数据在请求的*body*中发送。

```react
import {useEffect, useState} from "react";
import axios from "axios";

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // 如何使用filter
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault();
    // 对象的操作
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: false
    }
    // 新增数组 concat
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }
  // 事件中取值
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => {setShowAll(!showAll)}}>show{showAll ? true : false}</button>
      <ul>
        {
          // 如何使用map
          notesToShow.map(note => {
            return <li key={note.id}>{note.content}</li>
          })
        }
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange}/>
        <button type="submit">提交</button>
      </form>
    </div>
  )
}

export default App
```

我们可以用HTTP PUT请求来替换整个笔记，或者用HTTP PATCH请求只改变笔记的某些属性。

