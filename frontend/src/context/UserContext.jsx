// filepath: frontend/src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const currentTime = new Date().getTime();
      const sixHours = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      if (currentTime - userData.timestamp < sixHours) {
        setUser({ username: userData.username, role: userData.role });
      } else {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userData = { username: user.username, role: user.role, timestamp: new Date().getTime() };
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    } else {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};