import { configureStore } from '@reduxjs/toolkit';

import applicationNoReducer from './applicationNoSlice'

export default configureStore({
	reducer: {
		applicationNo: applicationNoReducer,
	},
});