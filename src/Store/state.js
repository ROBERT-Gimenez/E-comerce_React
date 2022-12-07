import { createSlice } from "@reduxjs/toolkit";

const Toogle = createSlice({
    name:"reducer",
    initialState:{
        night:true,
        Products:[]
    },
    reducers:{
        setNight(state){
           return { ...state ,
            night:!state.night
        }
    },
    setListStore:(state , action)=> {
        return { ...state , Products:action.payload}
    }
    }
})


export const {setNight,setListStore} = Toogle.actions;

export default Toogle.reducer;