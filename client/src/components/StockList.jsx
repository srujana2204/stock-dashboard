import React,{ useEffect, useState } from 'react';
import { getSupportedStocks } from '../api/stockApi';

export default function StockList({ selected, onToggle }) {
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getSupportedStocks()
      .then(setSymbols)
      .catch((err) => {
        console.error(err);
        setError('Failed to load stocks');
      });
  }, []);

 /* return (
    <div>
      <h3>Supported Stocks</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {symbols.map((sym) => (
        <label key={sym} style={{ display: 'block', marginBottom: '0.25rem' }}>
          <input
            type="checkbox"
            checked={selected.includes(sym)}
            onChange={() => onToggle(sym)}
          />
          <span style={{ marginLeft: '0.5rem' }}>{sym}</span>
        </label>
      ))}
    </div>
  );
}
*/
return (
    <div>
      <h3>Supported Stocks</h3>
      {error && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{error}</p>}

      <div className="stock-items">
        {symbols.map((sym) => (
          <div key={sym} className="stock-item">
            <label className="stock-label">
              <input
                type="checkbox"
                className="stock-checkbox"
                checked={selected.includes(sym)}
                onChange={() => onToggle(sym)}
              />
              <span>{sym}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
