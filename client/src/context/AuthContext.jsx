import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      return { token, user: { email } };
    }
    return null;
  });

  const loginUser = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', user.email);
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
