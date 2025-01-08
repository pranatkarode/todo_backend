function registerRoutes(app, routes, basePath = "/api") {
  Object.values(routes).forEach((route) => {
    app.use(basePath, route);
  });
}

module.exports = registerRoutes;
