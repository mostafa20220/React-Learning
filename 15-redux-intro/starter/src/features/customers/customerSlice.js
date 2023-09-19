// customer initial state
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// customer reducer function
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

  default:
    return state;
}
}



// Customer Actions Creators Functions

function createCustomer(fullName, nationalID) {
  return { type: "customer/createCustomer", payload: {fullName, nationalID, createdAt: new Date().toISOString()} };
}

function updateName(fullName, nationalID) {
  return { type: "customer/updateName", payload: {fullName, nationalID} };
}

export { createCustomer, updateName}