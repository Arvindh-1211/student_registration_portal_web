import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 1,
}

const applicationNoSlice = createSlice({
    name: 'applicationNo',
    initialState,
    reducers: {
        setApplicationNo : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setApplicationNo} = applicationNoSlice.actions

export default applicationNoSlice.reducer;