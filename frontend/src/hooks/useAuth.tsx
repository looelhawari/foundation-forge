import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authApi, Admin } from "@/lib/api";

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      const storedAdmin = localStorage.getItem("admin_user");

      if (token && storedAdmin) {
        try {
          // Verify token is still valid
          const response = await authApi.verifyToken();
          if (response.data.valid) {
            setAdmin(response.data.admin);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
          }
        } catch {
          // Token verification failed, clear storage
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const { token, admin: adminData } = response.data;

    // Store token and admin info
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(adminData));
    setAdmin(adminData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Logout request failed, but we'll clear local storage anyway
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      setAdmin(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const response = await authApi.getProfile();
      setAdmin(response.data);
      localStorage.setItem("admin_user", JSON.stringify(response.data));
    } catch {
      // Profile refresh failed
    }
  }, []);

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
