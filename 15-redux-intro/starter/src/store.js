import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({account: accountReducer, customer: customerReducer});

// create store
const store = createStore(rootReducer,devToolsEnhancer(applyMiddleware(thunk)));

export default store;