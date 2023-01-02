import { createSlice } from "@reduxjs/toolkit";

const Toogle = createSlice({
    name:"reducer",
    initialState:{
        night:true,
        Products:[],
        Admin:null,
        Token:null,
    },
    reducers:{
        setNight(state){
           return { ...state ,
            night:!state.night
        }
    },
        setAdmin(state){
           return { ...state ,
            Admin:true
        }
    },
    setListStore:(state , action)=> {
        return { ...state , Products:action.payload}
    },
    setToken:(state , action)=> {
        return { ...state ,Token:action.payload}
    },
    }
})


export const {setNight, setToken , setAdmin , setListStore} = Toogle.actions;

export default Toogle.reducer;