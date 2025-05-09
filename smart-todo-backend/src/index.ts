import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost: ${PORT}`)
);
