"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };
  const contextValue = { user, token, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}