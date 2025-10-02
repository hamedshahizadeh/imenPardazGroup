"use client";
import { createContext, useContext } from "react";

// ایجاد context
const UserContext = createContext(null);

// Provider
export function UserProvider({ user, children }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// هوک سفارشی برای استفاده در هر کامپوننت
export function useUser() {
  return useContext(UserContext);
}
