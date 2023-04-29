import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await axios.post('http://localhost:5000/posts', post)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default postsSlice.reducer
