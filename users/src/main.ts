import { app } from "./app";
import { healthRouter } from "./health/health.router";
import { userRouter } from "./user/user.router";

// Routes
app.use("/health", healthRouter);
app.use("/users", userRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
