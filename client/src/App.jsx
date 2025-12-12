import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const { auth } = useAuth();
  return <div>{auth ? <Dashboard /> : <LoginForm />}</div>;
}
