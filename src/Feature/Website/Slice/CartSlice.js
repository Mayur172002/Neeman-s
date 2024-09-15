import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useId } from 'react'

export const Insert_Cart = createAsyncThunk('Insert_Cart', async (data) => {
    const result = await axios.post(`http://localhost:3000/Cart`, data)
    return result
})
export const Get_CartItem = createAsyncThunk('Get_CartItem', async () => {
    const result = await axios.get(`http://localhost:3000/Cart`)
    return result.data
})
export const Delete_CartItem = createAsyncThunk('Delete_CartItem', async (id) => {
    const result = await axios.delete(`http://localhost:3000/Cart/${id}`)
    return result
})
const user_Id = localStorage.getItem('wid')
// const updatedItemWithUser = { ...updatedItem, userId: user_Id };
// console.log(updatedItemWithUser);
export const updateCartItemQuantity = createAsyncThunk('updateCartItemQuantity', async (updatedItem) => {
    const result = await axios.patch(`http://localhost:3000/Cart/${updatedItem.id}`, updatedItem)
    return result.data
})

export const Insert_Payment = createAsyncThunk('Insert_Payment', async (data) => {
        const result = await axios.post(`http://localhost:3000/Payment`, data)
        return result.data
})
export const Get_Payment = createAsyncThunk('Insert_Payment', async () => {
    const result = await axios.get(`http://localhost:3000/Payment`)
    return result.data
})
export const CartSlice = createSlice({
    name: "cart",
    initialState: ({
        cart: [],
        ItemCount: [],
        payment : [],
    }),
    reducers: {
        setItemCount: (state, action) => {
            state.ItemCount = action.payload
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if (item) {
                const originalPrice = parseInt(item.originalPrice.replace(/,/g, ''), 10);
                const newQuantity = item.quantity + 1;
                const updatedPrice = (originalPrice * newQuantity).toLocaleString('en-US');
                // Directly modify the state
                state.cart = state.cart.map((cartItem) =>
                    cartItem.id === itemId
                        ? { ...cartItem, quantity: newQuantity, price: updatedPrice }
                        : cartItem
                );
            }
        },

        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload)
            if (item && item.quantity > 1) {
                const originalPrice = parseInt(item.originalPrice.replace(/,/g, ''), 10);
                const newQuantity = item.quantity - 1;
                const updatedPrice = (originalPrice * newQuantity).toLocaleString('en-US');
                const updatedCart = state.cart.map((cartItem) =>
                    cartItem.id === action.payload
                        ? { ...cartItem, quantity: newQuantity, price: updatedPrice }
                        : cartItem
                );
                console.log(updatedCart);
                return {
                    ...state,
                    cart: updatedCart
                };
            }
        },
    },
    extraReducers: {
        [Get_CartItem.fulfilled]: (state, action) => {
            state.cart = action.payload
        },
        [Get_Payment.fulfilled] : (state,action) =>{
            state.payment = action.payload
        }  
    }

})
export const { setItemCount, incrementQuantity, decrementQuantity, setisOffcanvasOpen } = CartSlice.actions
export default CartSlice.reducer

//currentUserId: localStorage.getItem('wid')
//item.userId === state.currentUserId





