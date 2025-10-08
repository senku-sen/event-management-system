import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required");
}

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
};
