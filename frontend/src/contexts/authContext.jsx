import { createContext, useState, useEffect } from "react";
import api from "../service/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@App:token");
    if (token) {
      api.get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("@App:token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  function login(userData, token) {
    localStorage.setItem("@App:token", token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("@App:token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}