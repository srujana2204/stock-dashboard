import React,{ useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StockList from './StockList';
import PriceTable from './PriceTable';
import { useWebSocketPrices } from '../hooks/useWebSocketPrices';

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const [subscribed, setSubscribed] = useState([]);
  const prices = useWebSocketPrices(auth?.token, subscribed);

  const toggleSymbol = (symbol) => {
    setSubscribed((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );
  };

  /*return (
    <div style={{ padding: '1.5rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <h2>Stock Dashboard</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>
            Logged in as: {auth.user.email}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <StockList selected={subscribed} onToggle={toggleSymbol} />
        <PriceTable prices={prices} subscribedSymbols={subscribed} />
      </div>
    </div>
  );
}
*/
return (
    <div className="app-shell">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h2>Live Stock Dashboard</h2>
          <span>Monitor your subscribed tickers in real time</span>
        </div>
        <div>
          <span className="user-pill">
            <span>Signed in as</span>
            <strong>{auth.user.email}</strong>
          </span>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <div className="dashboard-column stock-list">
          <StockList selected={subscribed} onToggle={toggleSymbol} />
        </div>

        <div className="dashboard-column price-table-wrapper">
          <PriceTable prices={prices} subscribedSymbols={subscribed} />
        </div>
      </div>
    </div>
  );
}