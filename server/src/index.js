import express from 'express';
import http from 'http';
import cors from 'cors';
import { PORT } from './config.js';
import authRoutes from './auth/auth.routes.js';
import stockRoutes from './stocks/stocks.routes.js';
import { setupWebSocket } from './websocket/wsServer.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Stock dashboard API running' });
});

app.use('/auth', authRoutes);
app.use('/stocks', stockRoutes);

const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
