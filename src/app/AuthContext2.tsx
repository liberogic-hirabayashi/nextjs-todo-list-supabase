"use client";
// AuthContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
  session: any | null;
  login: () => void;
  logout: () => void;
  addTask: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState(null);
  const [add, setAdd] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session: any) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        } else if (session) {
          setSession(session);
        }
      }
    );
    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const login = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };
  const logout = () => {
    supabase.auth.signOut();
  };

  const addTask = () => {
    setAdd(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, addTask }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
