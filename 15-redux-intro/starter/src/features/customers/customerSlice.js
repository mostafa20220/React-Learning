import { createSlice } from "@reduxjs/toolkit";

// customer initial state
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};



// customer slice
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer:{
      prepare(fullName, nationalID) {
        return{ payload: {fullName, nationalID, createdAt: new Date().toISOString()} };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload.fullName;
    },
  },  
});


export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;


// // customer reducer function
// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };

//   default:
//     return state;
// }
// }



// // Customer Actions Creators Functions

// function createCustomer(fullName, nationalID) {
//   return { type: "customer/createCustomer", payload: {fullName, nationalID, createdAt: new Date().toISOString()} };
// }

// function updateName(fullName, nationalID) {
//   return { type: "customer/updateName", payload: {fullName, nationalID} };
// }

// export { createCustomer, updateName}