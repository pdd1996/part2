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
