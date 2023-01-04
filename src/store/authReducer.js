import { createSlice } from '@reduxjs/toolkit';

const authinitialState = {isAuthenticated:false,token:localStorage.getItem('token'),email:localStorage.getItem('email')}
const authSlice = createSlice({
    name:'auth',
    initialState:authinitialState,
    reducers:{
        login(state,action){
        state.isAuthenticated= true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        },
        logout(state){
        state.isAuthenticated= false;
        state.token = '';
        state.email = '';
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;