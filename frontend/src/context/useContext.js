import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context for user authentication
const AuthContext = createContext();

// Create a provider component for AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example: Simulate user login and store the user role
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Check if the user exists in local storage
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove from local storage on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
