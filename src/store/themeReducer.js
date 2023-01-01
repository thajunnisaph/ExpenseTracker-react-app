import { createSlice } from "@reduxjs/toolkit";
const themeinitialstate = {isTheme:false}
const themeSlice = createSlice({
    name:'theme',
    initialState:themeinitialstate,
    reducers:{
        toggle(state){
        state.isTheme = !state.isTheme;
        }
    }
})
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;