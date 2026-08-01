import { createContext, useState, useEffect } from "react";
import api from "../service/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@App:token");
    
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/users/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("@App:token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  function login(userData, token) {
    localStorage.setItem("@App:token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("@App:token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-papel flex items-center justify-center font-sans text-tinta/60 text-sm">
        Carregando...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}