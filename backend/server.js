import dotenv from "dotenv";
dotenv.config(); // Load .env file first

import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import groupRoute from "./routes/groupRoute.js";
import userRoute from "./routes/userRoute.js";

// Debug: Confirm environment variables
console.log("JWT_SECRET:", process.env.JWT_SECRET || "not set");
console.log("MONGO_URI:", process.env.MONGO_URI || "not set");
console.log("PORT:", process.env.PORT || "not set");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/groups", groupRoute);
app.use("/api/users", userRoute);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;