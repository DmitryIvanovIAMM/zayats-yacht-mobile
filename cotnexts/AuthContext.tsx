import { useRouter } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// https://medium.com/@siddhantshelake/expo-router-authentication-with-protected-routes-persistent-login-eed364e310cc
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // ✅ Default to authenticated state
  const router = useRouter();
  const login = () => {
    setIsAuthenticated(true);
    router.replace("/");
  };
  const logout = () => {
    setIsAuthenticated(false);
    router.replace("/");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
