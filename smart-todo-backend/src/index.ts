import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Basic health check endpoint
app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/todos", todoRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

const PORT = process.env.PORT || 3002;

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
