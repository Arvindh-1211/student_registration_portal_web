import { createSlice } from '@reduxjs/toolkit';

const applicationNoSlice = createSlice({
    name: 'applicationNo',
    initialState: {
        value: 1087
    },
    reducers: {
        setApplicationNo : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setApplicationNo} = applicationNoSlice.actions

export default applicationNoSlice.reducer;