import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const get_categories = createAsyncThunk('get_categories', async () => {
    const result = await axios.get(`http://localhost:3000/Categories`)
    return result.data;
})
export const Delete_categories = createAsyncThunk('Delete_categories', async (id) => {
    const result = await axios.delete(`http://localhost:3000/Categories/${id}`)
    return result
})
export const Insert_categories = createAsyncThunk('Insert_categories', async (data) => {
    const result = await axios.post(`http://localhost:3000/Categories`, data)
    return result
})
export const Update_categories = createAsyncThunk('Update_categories', async (data) => {
    const result = await axios.patch(`http://localhost:3000/Categories/${data.id}`, data)
    return result
})

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: ({
        name: "Mayur Bhaliya",
        categories: []
    }),
    reducers: {

    },
    extraReducers: {
        [get_categories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        }
    }
})
export const { } = CategoriesSlice.actions //not a improtent
export default CategoriesSlice.reducer