import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import verifyToken from "./infra/validators/tokenValidator.js";
import { signIn, signUp } from "./controllers/authControllers.js";
import {
	addHistory,
	getHistory,
	deleteHistory,
	editHistory,
} from "./controllers/historyControllers.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", signUp);
app.post("/login", signIn);

app.post("/history", verifyToken, addHistory);
app.get("/history", verifyToken, getHistory);
app.delete("/history/:id", verifyToken, deleteHistory);
app.put("/history/:id", verifyToken, editHistory);

app.listen(process.env.PORT, () => {
	console.log("Server running on port " + process.env.PORT);
});
