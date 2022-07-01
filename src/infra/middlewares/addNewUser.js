import bcrypt from "bcrypt";
import db from "../../databases/mongo.js";

async function addNewUser(req, res, next) {
	const newUser = res.locals.newUser;

	const isUserRegistered = await db.collection("users").findOne({
		email: newUser.email,
	});

	if (isUserRegistered) return res.status(409).send("Usuário já cadastrado!");

	const encryptedPassaword = bcrypt.hashSync(newUser.password, 10);

	await db.collection("users").insertOne({
		name: newUser.name,
		email: newUser.email,
		password: encryptedPassaword,
	});

	next();
}

export default addNewUser;
