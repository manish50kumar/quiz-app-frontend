import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const initialState = {
    data:null
}

const updateQuizSlice = createSlice({
    name: "updatequizdetail",
    initialState,
    reducers: {
        setData: (state, action) => {
            console.log("Calling slice ");
            state.data = action.payload;           
        },
        
        
    }
})

export const { setData  } = updateQuizSlice.actions;

export default updateQuizSlice.reducer;


