import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: '',
    sort: '',
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        storeFilters(state, action) {
            state.filters= action.payload.filters || '';
            state.sort= action.payload.sort || '';
        }
    },
    
})

export const selectedAllFilter = (state) => state.filters

export const { storeFilters } = filtersSlice.actions

export default filtersSlice.reducer
