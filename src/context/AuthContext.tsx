"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Cookies from 'js-cookie'
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type User = {
  jwt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  login: (user: User) => void;
  logout: () => void;
};

type ContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextType|null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const {setItem, getItem} = useLocalStorage()

  const login = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user))
    Cookies.set("user", JSON.stringify(user),{expires:1})
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user",{expires:1})

  };

  useEffect(() => {
    const user = Cookies.get("user")
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
