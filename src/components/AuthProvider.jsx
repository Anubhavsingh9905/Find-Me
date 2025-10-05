import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // function to fetch user again
  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://find-me-backend1.onrender.com/email/check-auth", {withCredentials: true,});
      console.log("Auth check:", res.data);
      setIsLoggedIn(res.data.isAuthenticated);
      setUser(res.data.user);
    } catch (err) {
      console.error("Auth error:", err);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // run once when app mounts
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, user, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
