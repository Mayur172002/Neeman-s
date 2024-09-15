import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const Insert_Blog = createAsyncThunk('Insert_Blog', async (data) => {
    const result = await axios.post(`http://localhost:3000/Blog`, data)
    return result
})
export const Get_Blog = createAsyncThunk('Get_Blog', async () => {
    const result = await axios.get(`http://localhost:3000/Blog`)
    return result.data
})
export const Delete_Blog = createAsyncThunk('Delete_Blog', async (id) => {
  const result = await axios.delete(`http://localhost:3000/Blog/${id}`)
  return result
})
export const Edit_Blog = createAsyncThunk('Edit_Blog', async (data) => {
  const result = await axios.patch(`http://localhost:3000/Blog/${data.id}`,data)
  return result
})

export const BlogSlice = createSlice({
    name: "blog",
    initialState: {
      blog : []
    },
    reducers: {

    },
    extraReducers: {
      [Get_Blog.fulfilled] : (state, action)=>{
       state.blog = action.payload  
      }
    }

})

export const { } = BlogSlice.actions
export default BlogSlice.reducer