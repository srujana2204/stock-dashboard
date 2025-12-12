import React,{ useState } from 'react';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(email);
      loginUser(data);
    } catch (err) {
      console.error(err);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  /*return (
    <div style={{ maxWidth: 320, margin: '4rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          placeholder="Enter your email"
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </form>
    </div>
  );
}*/
return (
    <div className="app-shell">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">Stock Broker Dashboard</h1>
          <p className="login-subtitle">
            Sign in with your email to view live stock prices.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <div className="form-label">Email address</div>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
