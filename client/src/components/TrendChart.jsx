import React from 'react';

export default function TrendChart({ symbol, history }) {
  const data = history[symbol] || [];

  if (!symbol || data.length < 2) {
    return (
      <div className="trend-card">
        <div className="trend-card-header">
          <h3>Price trend</h3>
        </div>
        <p className="empty-state">Select a stock row to view its trend.</p>
      </div>
    );
  }

  const width = 560;
  const height = 220;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1 || 1)) * width;
      const y = ((value - min) / range) * height;
      return `${x},${height - y}`;
    })
    .join(' ');

  return (
    <div className="trend-card">
      <div className="trend-card-header">
        <h3>{symbol} – intraday trend</h3>
      </div>
      <p className="empty-state" style={{ marginBottom: '8px' }}>
      Click a stock in the table above to view its intraday trend.
    </p>
      <div className="trend-chart-wrapper">
        <svg width={width} height={height}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.4)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>
          </defs>
          <polyline
            points={points}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 8,
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
      }}
    >
      <span>Time →</span>
      <span>Price ↑</span>
    </div>
    </div>
  );
}
