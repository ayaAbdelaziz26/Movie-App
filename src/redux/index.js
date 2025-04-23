import { configureStore } from "@reduxjs/toolkit";
import InputReducer from "./inputslice";
export const Store=configureStore({
    reducer:{
        input:InputReducer,
    }
});
