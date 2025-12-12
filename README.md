                                                Stock Broker Dashboard

Sign in with your email, subscribe to stocks, and watch prices move in real time with live trend charts and theming.

🚀 Project Overview

This is a full‑stack Stock Broker Client Web Dashboard built as a learning project to showcase:

-Real‑time updates with WebSockets

-Email‑only login with JWT authentication

-Per‑user watchlists stored in a SQL database

-A polished React dashboard UI with dark/light themes

-Simple trend charts for selected stocks

-Prices are simulated (randomly generated every second) so the app works without any external market data APIs.

✨ Features

1.Authentication & Users
-Email‑only login (no password, demo-style)

-JWT issued on login and stored in localStorage

-User records stored in MySQL (users table)

2.Watchlist & Stocks
-Fixed supported stocks: GOOG, TSLA, AMZN, META, NVDA

-Per‑user watchlist:

  -Subscribe/unsubscribe with checkboxes

  -Watchlist persisted in MySQL (user_watchlist table)

  -Automatically restored when user logs in again

3.Real‑Time Price Updates
-Node backend simulates stock prices with a random walk every second

-Clients subscribe to symbols over WebSockets

-Dashboards update live with:

  -Latest price per subscribed symbol
 
  -Independent updates for multiple users/sessions

4.Dashboard UI
-Supported Stocks panel:

Checkboxes for each supported symbol

Syncs with the watchlist in MySQL

-Subscribed Prices table:

  -Symbol and Last price columns

  -Clicking a row selects that stock for trend analysis

-Trend analysis card:

  -Shows latest intraday-like trend for the selected stock

  -Simple SVG line chart fed from streaming WebSocket data

  -Hint text: “Click a stock in the table above to view its intraday trend”

  -Axis hints: Time → and Price ↑

5.Theming & UX
-Global dark/light theme toggle

-Theming implemented via CSS variables + a data-theme attribute on <html>

-Theme preference persisted in localStorage

-Carefully tuned light mode:

   -Inputs, pills, and table cells remain readable and high‑contrast

-Smooth, modern styling:

   -Soft shadows, rounded cards, pill buttons

   -Clean table layout and hover states

🧱 Tech Stack
Frontend

React (Vite)

Axios for HTTP

Native WebSocket API for streaming prices

CSS with custom variables for theming



Backend

Node.js + Express

WebSockets (ws)

JWT (jsonwebtoken)

MySQL (mysql2/promise)

dotenv, cors

Database

MySQL

🧑‍💻 Purpose
This project was built as a full‑stack learning exercise to demonstrate:

-Real‑time WebSocket communication

-REST + JWT auth + SQL data modeling

-React state management and UI design

-Theming and responsive dashboard layout
