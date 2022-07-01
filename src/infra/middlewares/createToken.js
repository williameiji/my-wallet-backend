import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../../databases/mongo.js";

dotenv.config();

async function createToken(req, res, next) {
	const user = res.locals.user;

	const isUserRegistered = await db.collection("users").findOne({
		email: user.email,
	});

	if (
		isUserRegistered &&
		bcrypt.compareSync(user.password, isUserRegistered.password)
	) {
		const token = jwt.sign(
			{
				data: isUserRegistered.email,
			},
			process.env.SECRET_KEY_TOKEN,
			{ expiresIn: 5 * 60 }
		);

		res.locals.token = token;
		res.locals.name = isUserRegistered.name;

		next();
	} else {
		res.status(401).send("Usuário/senha inválidos.");
		return;
	}
}

export default createToken;
