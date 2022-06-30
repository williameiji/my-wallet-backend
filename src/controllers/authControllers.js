import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../databases/mongo.js";
import { schemaUser, schemaNewUser } from "../validations/schemaValidation.js";

dotenv.config();

export async function signIn(req, res) {
	const { email, password } = req.headers;
	const { error } = schemaUser.validate({
		email: email,
		password: password,
	});

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	try {
		const isUserRegistered = await db.collection("users").findOne({
			email,
		});

		if (
			isUserRegistered &&
			bcrypt.compareSync(password, isUserRegistered.password)
		) {
			const token = jwt.sign(
				{
					data: isUserRegistered.email,
				},
				process.env.SECRET_KEY_TOKEN,
				{ expiresIn: 5 * 60 }
			);

			res.status(200).send({ token, name: isUserRegistered.name });
		} else {
			res.status(401).send("Usuário/senha inválidos.");
			return;
		}
	} catch (err) {
		res.sendStatus(500);
	}
}

export async function signUp(req, res) {
	const { name, email, password, isPasswordEqual } = req.body;
	const { error } = schemaNewUser.validate({
		name,
		email,
		password,
		isPasswordEqual,
	});

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	try {
		const isUserRegistered = await db.collection("users").findOne({
			email,
		});

		if (isUserRegistered) return res.status(409).send("Usuário já cadastrado!");

		const encryptedPassaword = bcrypt.hashSync(password, 10);

		await db.collection("users").insertOne({
			name,
			email,
			password: encryptedPassaword,
		});

		res.status(201).send("Usuário cadastrado com sucesso!");
	} catch (err) {
		res.sendStatus(500);
	}
}
