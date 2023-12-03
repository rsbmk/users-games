import { app } from "./app";
import { gameRouter } from "./games/games.router";
import { healthRouter } from "./health/health.router";
import { AuthMiddleware } from "./shared/Middlewares/auth";

// Unprotected routes
app.use("/health", healthRouter);

const authMiddleware = new AuthMiddleware();
app.use(authMiddleware.run.bind(authMiddleware));

// Routes protected by authMiddleware
app.use("/games", gameRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
