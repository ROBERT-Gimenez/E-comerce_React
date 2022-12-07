import { configureStore } from "@reduxjs/toolkit";
import Toogle from './state'

const store = configureStore({
    reducer:Toogle,
  
});

export default store;