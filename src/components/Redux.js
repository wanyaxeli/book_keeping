import { configureStore } from "@reduxjs/toolkit";
import { SaleSlice } from "./Slices";
export  const store= configureStore({
   reducer:{
    sales:SaleSlice.reducer
   }
})
