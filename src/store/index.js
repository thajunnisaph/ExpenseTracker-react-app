import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expenseReducer from "./expenseReducer";
 const store = configureStore({
    reducer: {
        expense:expenseReducer,auth:authReducer
    }
 })
 export default store;