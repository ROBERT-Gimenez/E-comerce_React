import { configureStore } from "@reduxjs/toolkit";
import ListProduct  from "./Products";
import Toogle from './state'

const store = configureStore({
    reducer:Toogle,
    ListProduct,
});

export default store;