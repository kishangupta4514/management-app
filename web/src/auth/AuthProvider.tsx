import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  verify: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const verify = async () => {
    const tmp = localStorage.getItem("token");
    if (!tmp) return false;
    try {
      await axios.post(
        `${apiUrl}/verify`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tmp}`,
          },
        }
      );
    } catch (e) {
      console.log("Error in verificatino. ", e);
      logout();
    }
  };

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token") || null);
    } else localStorage.setItem("token", token || "");
    console.log("zz", token);
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null)};

  return (
    <AuthContext.Provider value={{ token, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}
