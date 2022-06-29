import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

const schemaUser = joi.object({
	email: joi.string().email().required(),
	password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const schemaInput = joi.object({
	value: joi.string().required(),
	description: joi.string().required(),
	color: joi.string(),
});

//ROTAS

app.post("/signup", async (req, res) => {
	const { name, email, password, isPasswordEqual } = req.body;
	const { error } = schemaNewUser.validate({
		name,
		email,
		password,
		isPasswordEqual,
	});

	if (error) {
		res.status(422).send("Dados incorretos");
		return;
	}

	try {
		const isUserRegistered = await db.collection("users").findOne({
			email,
		});

		if (isUserRegistered) {
			res.status(409).send("Usuário já cadastrado!");
			return;
		}

		const encryptedPassaword = bcrypt.hashSync(password, 10);

		await db.collection("users").insertOne({
			name,
			email,
			password: encryptedPassaword,
		});

		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.headers;
	const { error } = schemaUser.validate({
		email: email,
		password: password,
	});

	if (error) {
		res.sendStatus(422);
		return;
	}

	try {
		const isUserRegistered = await db.collection("users").findOne({
			email,
		});

		if (
			isUserRegistered ||
			bcrypt.compareSync(password, isUserRegistered.password)
		) {
			const token = uuid();

			await db.collection("sessions").insertOne({
				email: isUserRegistered.email,
				token,
			});

			res.status(200).send({ token, name: isUserRegistered.name });
		} else {
			res.sendStatus(401);
			return;
		}
	} catch (err) {
		res.sendStatus(500);
	}
});

app.post("/history", async (req, res) => {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	const { error } = schemaInput.validate(req.body);

	if (error) {
		res.sendStatus(422);
		return;
	}

	try {
		const getUser = await db.collection("sessions").findOne({
			token,
		});

		if (!getUser) return res.sendStatus(404);

		const user = await db.collection("users").findOne({
			email: getUser.email,
		});

		if (!user) return res.sendStatus(404);

		await db.collection("history").insertOne({
			email: user.email,
			...req.body,
			date: dayjs().format("DD-MM"),
		});

		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
	}
});

app.get("/history", async (req, res) => {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");

	try {
		const getUser = await db.collection("sessions").findOne({
			token,
		});

		if (!getUser) return res.sendStatus(404);

		const user = await db.collection("users").findOne({
			email: getUser.email,
		});

		if (!user) return res.sendStatus(404);

		const userHistory = await db
			.collection("history")
			.find({ email: user.email })
			.toArray();

		res.send(userHistory);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.delete("/history/:id", async (req, res) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");

	try {
		const getUser = await db.collection("sessions").findOne({
			token,
		});

		if (!getUser) return res.sendStatus(404);

		const informationToDelete = await db
			.collection("history")
			.findOne({ _id: ObjectId(`${id}`) });

		if (!informationToDelete) return res.sendStatus(404);

		await db.collection("history").deleteOne(informationToDelete);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.listen(process.env.PORT);
