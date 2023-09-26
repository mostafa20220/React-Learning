import  { createSlice } from "@reduxjs/toolkit";


const initialState = {
  username:'MOHAMED',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state,action){
      state.username = action.payload;
    }
  }
});


export default userSlice.reducer;
export const {updateUsername} = userSlice.actions;