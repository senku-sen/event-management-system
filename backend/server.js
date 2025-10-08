import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";

import groupRoute from "./routes/groupRoute.js";


dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());

app.use("/api/groups", groupRoute);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;


