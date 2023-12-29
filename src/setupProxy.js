const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/smart',
    createProxyMiddleware({
      target: 'https://www.meituan.com',
      changeOrigin: true,
    })
  );
};