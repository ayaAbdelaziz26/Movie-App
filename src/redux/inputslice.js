import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const InputSlice= createSlice({
    name:"input",
    initialState:{
        value:"",
        result:[]
    },
    reducers:{
        setInput:(state,action)=>{
            state.value=action.payload
        },
        clearInput:(state)=>{
            state.value='';
        },
        getResults:(state,action)=>{
            state.result=action.payload;
        }

    }
})
export const {setInput,clearInput,getResults}=InputSlice.actions;
export default InputSlice.reducer;