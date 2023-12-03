import { app } from "./app";
import { ROUTES, setupProxies } from "./proxy";

import { healthRouter } from "./health/health.router";
import { userRouter } from "./user/user.router";

import { AuthMiddleware } from "./shared/middlewares/auth";

const port = process.env.PORT || 3000;

const authMiddleware = new AuthMiddleware();

// Routes
app.use("/health", healthRouter);
app.use("/api", userRouter);

// Middlewares
app.use(authMiddleware.verifyToken.bind(authMiddleware));

app.use((req, res, next) => {
  console.log("Request:", { method: req.method, url: req.url, body: req.body });
  next();
});

// Proxy
setupProxies(app, ROUTES);

app.listen(port, () => {
  // Start server
  console.log(`Server running on port ${port}`);
});
