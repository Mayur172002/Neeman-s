import { configureStore } from "@reduxjs/toolkit";
import  UserSlice  from "./Feature/Website/Slice/UserSlice";
import ProductSlice from "./Feature/Admin/Slice/ProductSlice";
import CategoriesSlice from "./Feature/Admin/Slice/CategoriesSlice";
import  BlogSlice  from "./Feature/Admin/Slice/BlogSlice";
import CartSlice from "./Feature/Website/Slice/CartSlice";
export default configureStore({
    reducer :{
        myuser  : UserSlice,
        users  : UserSlice,
        categories  : CategoriesSlice,
        product :  ProductSlice,
        blog : BlogSlice, 
        cart : CartSlice,
        payment : CartSlice
    }
})