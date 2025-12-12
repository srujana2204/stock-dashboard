// import React,{ useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import StockList from './StockList';
// import PriceTable from './PriceTable';
// import { useWebSocketPrices } from '../hooks/useWebSocketPrices';
// import {
//   getWatchlist,
//   addToWatchlist,
//   removeFromWatchlist,
// } from '../api/stockApi';

// export default function Dashboard() {
//   const { auth, logout } = useAuth();
//   const [subscribed, setSubscribed] = useState([]);
//   const prices = useWebSocketPrices(auth?.token, subscribed);

//   useEffect(() => {
//     if (!auth?.token) return;
//     getWatchlist(auth.token)
//       .then((symbols) => {
//         setSubscribed(symbols);
//       })
//       .catch((err) => {
//         console.error('Failed to load watchlist', err);
//       });
//   }, [auth?.token]);

//   const toggleSymbol = async(symbol) => {
//     setSubscribed((prev) =>
//       prev.includes(symbol)
//         ? prev.filter((s) => s !== symbol)
//         : [...prev, symbol],
//     );
//   };

//   try {
//       if (subscribed.includes(symbol)) {
//         await removeFromWatchlist(auth.token, symbol);
//       } else {
//         await addToWatchlist(auth.token, symbol);
//       }
//     } catch (err) {
//       console.error('Watchlist update failed', err);
//       // optional: rollback UI if needed
//     }
//   };


//   /*return (
//     <div style={{ padding: '1.5rem' }}>
//       <header
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           marginBottom: '1.5rem',
//         }}
//       >
//         <h2>Stock Dashboard</h2>
//         <div>
//           <span style={{ marginRight: '1rem' }}>
//             Logged in as: {auth.user.email}
//           </span>
//           <button onClick={logout}>Logout</button>
//         </div>
//       </header>
//       <div style={{ display: 'flex', gap: '2rem' }}>
//         <StockList selected={subscribed} onToggle={toggleSymbol} />
//         <PriceTable prices={prices} subscribedSymbols={subscribed} />
//       </div>
//     </div>
//   );
// }
// */
// return (
//     <div className="app-shell">
//       <header className="dashboard-header">
//         <div className="dashboard-title">
//           <h2>Live Stock Dashboard</h2>
//           <span>Monitor your subscribed tickers in real time</span>
//         </div>
//         <div>
//           <span className="user-pill">
//             <span>Signed in as</span>
//             <strong>{auth.user.email}</strong>
//           </span>
//           <button className="logout-button" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="dashboard-body">
//         <div className="dashboard-column stock-list">
//           <StockList selected={subscribed} onToggle={toggleSymbol} />
//         </div>

//         <div className="dashboard-column price-table-wrapper">
//           <PriceTable prices={prices} subscribedSymbols={subscribed} />
//         </div>
//       </div>
//     </div>
//   );
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StockList from './StockList';
import PriceTable from './PriceTable';
import TrendChart from './TrendChart';

import { useWebSocketPrices } from '../hooks/useWebSocketPrices';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../api/stockApi';

export default function Dashboard({ theme, toggleTheme }) {
  const { auth, logout } = useAuth();
  const [subscribed, setSubscribed] = useState([]);
   const [selectedSymbol, setSelectedSymbol] = useState(null);
  const { prices, previousPrices, history } = useWebSocketPrices(
    auth?.token,
    subscribed,
  ); // if you added previousPrices/history; otherwise use just prices

  // Load initial watchlist
  useEffect(() => {
    if (!auth?.token) return;
    getWatchlist(auth.token)
      .then((symbols) => {
        setSubscribed(symbols);
      })
      .catch((err) => {
        console.error('Failed to load watchlist', err);
      });
  }, [auth?.token]);

  // Toggle symbol + persist to backend
    const toggleSymbol = async (symbol) => {
    setSubscribed((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );

    try {
      if (subscribed.includes(symbol)) {
        await removeFromWatchlist(auth.token, symbol);
        if (selectedSymbol === symbol) setSelectedSymbol(null);
      } else {
        await addToWatchlist(auth.token, symbol);
        if (!selectedSymbol) setSelectedSymbol(symbol);
      }
    } catch (err) {
      console.error('Watchlist update failed', err);
    }
  };


  return (
    <div className="app-shell">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h2>Live Stock Dashboard</h2>
          <span>Monitor your subscribed tickers in real time</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="logout-button" onClick={toggleTheme}>
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
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
          <PriceTable
            prices={prices}
            previousPrices={previousPrices}
            history={history}
            subscribedSymbols={subscribed}
            onSelect={setSelectedSymbol}
          />
          <TrendChart symbol={selectedSymbol} history={history} />
        </div>
      </div>
    </div>
  );
}
