import { createSlice } from "@reduxjs/toolkit";

const initialState={
    username:'not login',
    latestData:'lat long'
}

const mainSlice=createSlice({
    name:'main',
    initialState,
    reducers:{
        addUser:(state, prop)=>{
            state.username=prop.payload;
            // console.log(prop);
        },
        addData:(state, prop)=>{
            state.latestData=prop.payload;
        }
    }
})

export default mainSlice;