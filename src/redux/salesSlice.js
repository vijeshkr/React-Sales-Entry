import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    header: {},
    details: [],
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        // Reducer to set header informations for the sale
        setHeader(state, action) {
            state.header = {
                ...state.header,
                ...action.payload
            }
        },
        // Reducer to add new sale details
        addDetails(state, action) {
            const newItem = {
                ...action.payload,
                sr_no: state.details.length + 1
            };
            state.details.push(newItem);
        },
        // Reducer to remove specific sale details
        removeDetails(state, action) {
            // Remove the item from the details
            state.details = state.details.filter((item) => item.sr_no !== action.payload);

            // Reassign serial numbers for the remaining items
            state.details.forEach((item, index) => {
                item.sr_no = index + 1; // Reassign serial number
            });
        },
        // Reducer to reset the sales state
        resetSales(state) {
            return initialState;
        }
    }
});

export const { setHeader, addDetails, removeDetails, resetSales } = salesSlice.actions;
export default salesSlice.reducer;