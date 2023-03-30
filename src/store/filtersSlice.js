import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: '',
    sort: '',
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        storingFilters(state, action) {
            state.filters= action.payload.filters || '';
            state.sort= action.payload.sort || '';
        }
    },
    
})

export const selectedAllFilter = (state) => state.filters

export const { storingFilters } = filtersSlice.actions

export default filtersSlice.reducer
