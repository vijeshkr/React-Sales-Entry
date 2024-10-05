import { configureStore } from "@reduxjs/toolkit";
import salesReducer from './salesSlice';

// Create and configure the Redux store
const store = configureStore({
    reducer: {
        sales: salesReducer,
    }
});

export default store;