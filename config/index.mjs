import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const dbUri = process.env.MONGO_CONNECTION_URL;
export const jwtSecret = process.env.JWT_SECRET;
