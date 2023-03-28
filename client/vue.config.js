const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    runtimeCompiler: true,
    devServer: {
        before: function(app) {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://heart-rate-server:3000',
          changeOrigin: true,
        })
      );
    },
        disableHostCheck: true
      }
};
