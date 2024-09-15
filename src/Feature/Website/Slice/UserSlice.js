import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const Insert_User = createAsyncThunk("Insert_User", async (data) => {
    const result = await axios.post(`http://localhost:3000/user`, data)
    return result
})
export const Get_User = createAsyncThunk("Get_User", async () => {
    const result = await axios.get(`http://localhost:3000/user/${localStorage.getItem('wid')}`)
    return result.data
})
export const Get_User1 = createAsyncThunk("Get_User1", async () => {
    const result = await axios.get(`http://localhost:3000/user`)
    return result.data
})
export const Edit_User = createAsyncThunk("Edit_User", async (data) => {
    const result = await axios.patch(`http://localhost:3000/user/${data.id}`, data);
    return result
})
export const UserSlice = createSlice({
    name: "user",
    initialState: {
        name: "mayur",
        myuser: [],
        users : []
    },
    reducers: {

    },
    extraReducers: {
        [Get_User.fulfilled]: (state, action) => {
            state.myuser = action.payload
        },
        [Get_User1.fulfilled] : (state,action)=>{
            state.users = action.payload
        }
    }
})

export const { } = UserSlice.actions
export default UserSlice.reducer
