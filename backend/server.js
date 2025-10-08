import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";

import groupRoute from "./routes/groupRoute.js";
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";


dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());

app.use("/api/groups", groupRoute);
app.use("/api/events", eventRoute);
app.use("/api/users", userRoute);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  export default app;


