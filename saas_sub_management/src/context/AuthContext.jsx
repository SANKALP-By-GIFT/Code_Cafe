import { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/tokenStorage";

export const AuthContext = createContext();

const USERS_KEY = "edupro_users";

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const register = (email, password) => {
    const existingUsers =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const userExists = existingUsers.find(
      (user) => user.email === email
    );

    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = { email, password };
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...existingUsers, newUser])
    );
  };

  const login = (email, password) => {
    const existingUsers =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const fakeToken = "mock-jwt-token-12345";
    setToken(fakeToken);
    setAuthToken(fakeToken);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
