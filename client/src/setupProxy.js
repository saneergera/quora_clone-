const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/*", { target: "http://localhost:3000/" }));
  app.use(proxy("/auth/google", { target: "http://localhost:3000/" }));
  app.use(proxy("/auth/facebook", { target: "http://localhost:3000/" }));
};
