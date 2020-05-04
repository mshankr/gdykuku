const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  // interesting, this link gets picked up by /auth/google/callback too!
  app.use("/auth/google",
    createProxyMiddleware({
      target: "http://localhost:5000/"
  }))
  app.use("/api/*",
    createProxyMiddleware({
      target: "http://localhost:5000/"
  }))
}
