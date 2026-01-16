import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import executionRoute from "./routes/executionRoute.js";
import snippetRoute from "./routes/snippetRoute.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/execution", executionRoute);
app.use("/api/snippets", snippetRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
  });
} else {
  connectDB();
}

export default app;
