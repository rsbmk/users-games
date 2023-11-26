import { app } from "./app";
import { healthRouter } from "./health/health.router";

// Routes
app.use("/health", healthRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
