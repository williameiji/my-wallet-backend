import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

mongoClient.connect().then(() => {
	db = mongoClient.db("Wallet-DB");
});

//SCHEMA
const schemaNewUser = joi
	.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi
			.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required(),
		isPasswordEqual: joi.ref("password"),
	})
	.with("password", "isPasswordEqual");

//ROTAS

app.post("/signup", async (req, res) => {
	const { error } = schemaNewUser.validate(req.body);

	if (error) {
		res.sendStatus(422);
		return;
	}

	try {
		const isUserRegistered = await db.collection("users").findOne({
			email: req.body.email,
		});

		if (isUserRegistered) {
			res.sendStatus(409);
			return;
		}

		await db.collection("users").insertOne({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.post("/login", (req, res) => {});

app.listen(process.env.PORT);
