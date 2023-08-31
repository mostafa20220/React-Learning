import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loggedIn":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "loggedOut":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error(`Unknown action type!: ${action.type}`);
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Mostafa Hesham",
  email: "mostafa@example.com",
  password: "passwordd",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email.trim() === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "loggedIn", payload: FAKE_USER });
      return true;
    }

    return false;
  }

  function logout() {
    dispatch({ type: "loggedOut" });
    return true;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth was used outside AuthContext!");

  return context;
}

export { useAuth, AuthProvider };
