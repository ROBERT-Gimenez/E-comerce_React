import { createSlice } from "@reduxjs/toolkit";

const Toogle = createSlice({
    name:"reducer",
    initialState:{
        night:true,
    },
    reducers:{
        setNight(state){
           return { ...state ,
            night:!state.night
        }
    },
    }
})

export const {setNight} = Toogle.actions;

export default Toogle.reducer;