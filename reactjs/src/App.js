import './App.css'
import { useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')

  const obj = {
    title: title,
    detail: detail,
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  }

  const sendData = () => {
    fetch('http://localhost:5000/posts', requestOptions)
  }

  return (
    <div className='mainDiv'>
      <div style={{ textAlign: 'center' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='title'
        />
        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          type='text'
          placeholder='detail'
        />
        <button onClick={sendData}>click !</button>
      </div>
    </div>
  )
}
export default App
