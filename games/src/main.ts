import { AuthMiddleware } from "packages/middleware";

import { app } from "./app";
import { gameRouter } from "./games/games.router";
import { healthRouter } from "./health/health.router";

// Unprotected routes
app.use((req, res, next) => {
  console.log("Request:", { method: req.method, url: req.url, body: req.body });
  next();
});

app.use("/health", healthRouter);

const authMiddleware = new AuthMiddleware();
app.use(authMiddleware.run.bind(authMiddleware));

// Routes protected by authMiddleware
app.use("/games", gameRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
