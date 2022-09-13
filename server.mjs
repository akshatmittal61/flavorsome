import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./config/index.mjs";
import connect from "./db/index.mjs";
import apiAuth from "./routes/auth.mjs";
import apiRecipes from "./routes/recipe.mjs";

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", apiAuth);
app.use("/api/recipe", apiRecipes);

app.listen(PORT, () => {
	connect();
	console.log(`Server started at port ${PORT}`);
});
