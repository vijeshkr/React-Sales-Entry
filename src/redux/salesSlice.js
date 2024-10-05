import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        header: {},
        details: [],
    },
    reducers: {
        // Reducer to set header informations for the sale
        setHeader(state, action) {
            state.header = {
                ...state.header,
                ...action.payload
            }
        },
        // Reducer to add new sale details
        addDetails(state, action){
            state.details.push(action.payload);
        },
        // Reducer to remove specific sale details
        removeDetails(state, action){
            state.details = state.details.filter((_,index) => index !== action.payload);
        },
        // Reducer to reset the sales state
        resetSales: () => initialState,
    }
});

export const { setHeader, addDetails, removeDetails, resetSales } = salesSlice.actions;
export default salesSlice.reducer;