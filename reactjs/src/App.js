import './App.css'
import { useState } from 'react'
import { createPost } from './redux/reducers/postSlice'
import { useDispatch } from 'react-redux'
const App = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')

  const post = {
    title: title,
    detail: detail,
  }

  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(post),
  // }

  const sendData = () => {
    // fetch('http://localhost:5000/posts', requestOptions)
    dispatch(createPost(post))
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
