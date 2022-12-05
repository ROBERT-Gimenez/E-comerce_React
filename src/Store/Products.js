import { createSlice } from "@reduxjs/toolkit";


const ListProduct = createSlice({
    name:"products",
    initialState :{
        value:[],
    },
    reducers:{
        setListStore:(state , action)=> {
            return state.value = action.payload
        }
    },
})

export const {setListStore} = ListProduct.actions

export default ListProduct.reducer;