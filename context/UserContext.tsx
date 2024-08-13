// "use client";

// import { createContext } from "react";

// export interface User {
//   id: string | undefined;
//   email: string | undefined;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
// }

// const defaultUserContext: UserContextType = {
//   user: null,
//   setUser: () => {},
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// };

// export const UserContext = createContext<UserContextType>(defaultUserContext);

"use client";

import { getSession, removeSession } from "@/lib/cookie";
import React, { createContext, useState, useEffect } from "react";

// Define the type for the context state
interface UserContextType {
  userId: string | null;
  setUser: (userId: string) => void;
  logout: () => void;
}

// Default value for the context
const defaultValue: UserContextType = {
  userId: null,
  setUser: () => {},
  logout: () => {},
};

// Create the context
export const UserContext = createContext<UserContextType>(defaultValue);

// UserProvider component to wrap around components needing user session state
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const setUser = (userId: string) => {
    setUserId(userId);
  };

  const logout = () => {
    setUserId(null);
    removeSession();
  };

  // Check for an active session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // Get the session from cookies
      if (session) {
        const { userId } = JSON.parse(session.value);
        setUserId(userId);
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};