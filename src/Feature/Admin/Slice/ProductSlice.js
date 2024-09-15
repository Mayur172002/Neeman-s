import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const Insert_Product = createAsyncThunk('Insert_Product', async (data) => {
  const result = await axios.post(`http://localhost:3000/Products`, data)
  return result
})
export const Get_Product = createAsyncThunk('Get_Product', async () => {
  const result = await axios.get(`http://localhost:3000/Products`)
  return result.data
})
export const Edit_Product = createAsyncThunk('Edit_Product', async (data) => {
  const result = await axios.patch(`http://localhost:3000/Products/${data.id}`, data)
  return result
})
export const Delete_Product = createAsyncThunk('Delete_Product', async (id) => {
  const result = await axios.delete(`http://localhost:3000/Products/${id}`,)
  return result
})
export const ProductSlice = createSlice({
  name: 'product',
  initialState: ({
    product: [],
    search: '',
  }),

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: {
    [Get_Product.fulfilled]: (state, action) => {
      state.product = action.payload
    }
  }
})

export const { setSearch} = ProductSlice.actions
export default ProductSlice.reducer