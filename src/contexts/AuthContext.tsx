
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('ngHostingUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('ngHostingUser');
      }
    }
  }, []);

  // Admin user for initial setup
  const adminUser = {
    email: "alexsess22@gmail.com",
    firstName: "Kj",
    lastName: "Developer",
    password: "Kj696969420420$",
    isAdmin: true
  };

  // Store admin user in localStorage if not already present
  useEffect(() => {
    const usersDb = localStorage.getItem('ngHostingUsers');
    let users = [];
    
    if (usersDb) {
      try {
        users = JSON.parse(usersDb);
      } catch (error) {
        console.error("Failed to parse users database:", error);
      }
    }
    
    // Check if admin exists, add if not
    if (!users.some((u: any) => u.email === adminUser.email)) {
      users.push(adminUser);
      localStorage.setItem('ngHostingUsers', JSON.stringify(users));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Get users from localStorage
    const usersDb = localStorage.getItem('ngHostingUsers');
    if (!usersDb) {
      toast({
        title: "Authentication Error",
        description: "User database not found",
        variant: "destructive"
      });
      return false;
    }

    try {
      const users = JSON.parse(usersDb);
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Remove password before storing in state
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('ngHostingUser', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${foundUser.firstName} ${foundUser.lastName}`,
        });
        return true;
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ngHostingUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
