// import React from 'react';

// export default function PriceTable({ prices, subscribedSymbols }) {
//   const visible = subscribedSymbols.filter((s) => prices[s] !== undefined);

//   if (visible.length === 0) {
//     return <p>No prices yet. Subscribe to some stocks.</p>;
//   }

//   /*return (
//     <table border="1" cellPadding="6" style={{ minWidth: 220 }}>
//       <thead>
//         <tr>
//           <th>Symbol</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {visible.map((sym) => (
//           <tr key={sym}>
//             <td>{sym}</td>
//             <td>{prices[sym]}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
// */
// return (
//     <div>
//       <h3 className="price-table-title">Subscribed prices</h3>

//       {visible.length === 0 ? (
//         <p className="empty-state">
//           No prices yet. Select one or more stocks on the left.
//         </p>
//       ) : (
//         <table className="price-table">
//           <thead>
//             <tr>
//               <th>Symbol</th>
//               <th>Last price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visible.map((sym) => (
//               <tr key={sym}>
//                 <td>{sym}</td>
//                 <td>
//                   <span className="price-chip">{prices[sym]}</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React from 'react';

export default function PriceTable({ prices, subscribedSymbols, onSelect }) {
  const rows = subscribedSymbols.filter((s) => prices[s] !== undefined);

  return (
    <div>
      <h3 className="price-table-title">Subscribed prices</h3>

      {rows.length === 0 ? (
        <p className="empty-state">
          No prices yet. Select one or more stocks on the left.
        </p>
      ) : (
        <table className="price-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((sym) => (
              <tr
                key={sym}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelect(sym)}
              >
                <td>{sym}</td>
                <td>
                  <span className="price-chip">{prices[sym]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
