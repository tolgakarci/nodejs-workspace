import './App.css'
import { useState, useEffect } from 'react'
import { createPost } from './redux/reducers/postSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const postStatus = useSelector((state) => state.post.status)

  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [status, setStatus] = useState('')

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
    if (title.length > 3 && detail.length > 3) {
      dispatch(createPost(post))
      setTimeout(() => {
        setStatus('')
      }, 1000)
    } else {
      alert('Informations must contain at least 3 characters.')
    }
  }

  useEffect(() => {
    setStatus(postStatus)
    if (postStatus === 'succeeded') {
      setTitle('')
      setDetail('')
    }
  }, [postStatus])

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
        <span style={{ display: 'block', marginTop: '10px' }}>
          {status.length && status !== 'idle' ? 'Status: ' + status : ''}
        </span>
      </div>
    </div>
  )
}
export default App
