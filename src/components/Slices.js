import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import React,{useEffect} from "react";
import axios from "axios";
const initialState = {
    store:{stock:[],isLoading:false,errors:''},
    sales:[]}
export const SaleSlice=createSlice({
    name:'sale',
    initialState,
    reducers:{
        addToSale:(state,action)=>{
           state.sales.push(action.payload)
        },
        addToStock:(state,action)=>{
            state.store.stock.push(action.payload)
          },
        searchItem:(state,action)=>{
         const searchBar=state.store.stock.filter(item=>{
            return item.medicine.toLowerCase().includes(action.payload)
         })
         console.log(searchBar)
        },
        reduceQuantity:(state,action)=>{
        if(state.store.stock.forEach(item=>item.medicine.includes(action.payload))){
            const item=state.store.stock.find(item=>item.medicine.toLowerCase()===action.payload)
            const reducedQuantity=item.quantity -- 
            return state.store.stock.forEach(item=>item.quantity = reducedQuantity)
        }else {
            console.log('item does not exist')
            return false
        }
        }  
    },
    extraReducers:(builder)=>{
    builder
    .addCase(fetchStock.pending,(state,action)=>{
        state.store.isLoading=true
        state.store.errors=''
        state.store.stock=[]
    })
    .addCase(fetchStock.fulfilled,(state,action)=>{
        state.store.isLoading=true
        state.store.errors=''
        state.store.stock=action.payload
    })
    .addCase(fetchStock.rejected,(state,action)=>{
        state.store.isLoading=false
        state.store.errors=action.error.message
        state.store.stock=[]
    })
    }
})
export const fetchStock=createAsyncThunk(
    "sale/fetchStock",
    async (thunkAPI)=>{
    const token= localStorage.getItem('token')
    const endpoint='http://127.0.0.1:8000/store/'
    try{
        const res= await axios.get(endpoint,{
            headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return res.data
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
    }
    
)

 export const {addToSale,addToStock,searchItem,reduceQuantity} =SaleSlice.actions