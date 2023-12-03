import { app } from "./app";

import { AuthMiddleware } from "packages/middleware";

import { healthRouter } from "./health/health.router";
import { userRouter } from "./user/user.router";

// Unprotected routes
app.use("/health", healthRouter);

const authMiddleware = new AuthMiddleware();
app.use(authMiddleware.run.bind(authMiddleware));

// Routes protected by authMiddleware
app.use("/users", userRouter);

app.listen(app.get("PORT"), () => {
  // Start server
  console.log(`Server running on port ${app.get("PORT")}`);
});
