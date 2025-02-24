import { createContext, useState, ReactNode } from "react";

// TODO INTERFACE USER
interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  loadUserData: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const loadUserData = () => {
    const localUser = localStorage.getItem("user");
    setUser(localUser ? JSON.parse(localUser) : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
