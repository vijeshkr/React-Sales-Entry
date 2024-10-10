import { createSlice } from "@reduxjs/toolkit";

// Initial state for the sales slice
const initialState = {
    header: {},
    details: [],
    nameError: {},
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        // Reducer to set header informations for the sale
        setHeader(state, action) {
            // Merging current header state with the new payload
            state.header = {
                ...state.header,
                ...action.payload
            }
        },
        // Reducer to add new sale details
        addDetails(state, action) {
            // Creating a new item with a unique serial number based on current details length
            const newItem = {
                ...action.payload,
                sr_no: state.details.length + 1
            };
            state.details.push(newItem);
        },
        // Reducer to remove specific sale details by serial number
        removeDetails(state, action) {
            // Remove the item from the details
            state.details = state.details.filter((item) => item.sr_no !== action.payload);

            // Reassign serial numbers for the remaining items
            state.details.forEach((item, index) => {
                item.sr_no = index + 1;
            });
        },
        // Reducer to reset the sales state to its initial state
        resetSales(state) {
            return initialState;
        },
        // Reducer to set ac name error
        setNameError(state, action) {
            state.nameError = action.payload;
        },
    }
});

export const { setHeader, addDetails, removeDetails, resetSales, setNameError } = salesSlice.actions;
export default salesSlice.reducer;