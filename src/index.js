import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/indexRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type");
	next();
});
app.use(router);

app.listen(process.env.PORT, () => {
	console.log("Server running on port " + process.env.PORT);
});
