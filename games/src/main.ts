import { app } from "./app";
import { gameRouter } from "./games/games.router";
import { healthRouter } from "./health/health.router";

// Routes
app.use("/health", healthRouter);
app.use("/games", gameRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
