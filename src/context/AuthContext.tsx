"use client";
import { type } from "os";
import { ReactNode, createContext, useContext, useState } from "react";

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

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
