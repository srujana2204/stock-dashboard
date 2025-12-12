//import React from 'react';
import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const { auth } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const appProps = { theme, toggleTheme };

  return (
    <div>
      {auth ? (
        <Dashboard {...appProps} />
      ) : (
        <LoginForm {...appProps} />
      )}
    </div>
  );
}
