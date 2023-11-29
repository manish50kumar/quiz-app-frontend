import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import updateQuizReducer from "../slices/updateQuizSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    updatequizdetail:updateQuizReducer,
})

export default rootReducer;