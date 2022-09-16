import { config } from "dotenv";

config();

export const PORT = process.env.PORT; // PORT to run backend server
export const dbUri = process.env.MONGO_CONNECTION_URL; // MongoDB connection string
export const jwtSecret = process.env.JWT_SECRET; // JWT secret string
