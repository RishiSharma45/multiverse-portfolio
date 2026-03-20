const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Gateway Running 🌐');
});

console.log('AUTH_SERVICE_URL:', process.env.AUTH_SERVICE_URL);
console.log('PORTFOLIO_SERVICE_URL:', process.env.PORTFOLIO_SERVICE_URL);

app.use(
  '/api/auth',
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true
  })
);

app.use(
  '/api/projects',
  createProxyMiddleware({
    target: process.env.PORTFOLIO_SERVICE_URL,
    changeOrigin: true
  })
);

app.use(
  '/api/site-content',
  createProxyMiddleware({
    target: process.env.PORTFOLIO_SERVICE_URL,
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});