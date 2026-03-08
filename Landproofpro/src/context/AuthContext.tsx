import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserType = 
  | "Property Buyers"
  | "Landowners"
  | "Developers"
  | "Architects & Engineers"
  | "Banks & Mortgage Institutions"
  | "Lawyers"
  | "Estate Agents"
  | "Government Agencies (FCTA, Development Control)"
  | "Insurers";

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (name: string, email: string, userType: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('landproof_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    // Mock login: Just create a dummy user based on email if we don't know them, 
    // or retrieve from a mock DB if we wanted to be fancy. 
    // For now, let's just create a generic mock session.
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0], // derived name
      email,
      userType: "Property Buyers", // default for mock login unless we had real DB
      isPremium: email.toLowerCase().includes('premium'),
    };
    
    // If we previously signed up locally, try to grab that
    const existingUsersStr = localStorage.getItem('landproof_users_db');
    if (existingUsersStr) {
      const db: User[] = JSON.parse(existingUsersStr);
      const found = db.find(u => u.email === email);
      if (found) {
        setUser(found);
        localStorage.setItem('landproof_user', JSON.stringify(found));
        return;
      }
    }

    setUser(mockUser);
    localStorage.setItem('landproof_user', JSON.stringify(mockUser));
  };

  const signup = (name: string, email: string, userType: UserType) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      userType,
      isPremium: email.toLowerCase().includes('premium'),
    };

    // Save to mock local DB so login can find it
    const existingUsersStr = localStorage.getItem('landproof_users_db');
    const db: User[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    db.push(newUser);
    localStorage.setItem('landproof_users_db', JSON.stringify(db));

    // Log them in immediately
    setUser(newUser);
    localStorage.setItem('landproof_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('landproof_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
