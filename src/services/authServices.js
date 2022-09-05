import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signUp(data) {
	const user = await getUserInformationByEmail(data.email);

	if (user) return res.status(409).send("Usuário já cadastrado!");

	const encryptedPassaword = bcrypt.hashSync(data.password, 10);

	await userRepository.addNewUser(data, encryptedPassaword);
}

export async function signIn(data) {
	const user = await getUserInformationByEmail(data.email);

	if (isUserRegistered && bcrypt.compareSync(data.password, user.password)) {
		const token = jwt.sign(
			{
				data: user.email,
			},
			process.env.SECRET_KEY_TOKEN,
			{ expiresIn: 60 * 60 }
		);

		return { token: token, name: user.name };
	} else {
		throw { code: "Anauthorized", message: "Usuário/senha inválidos." };
	}
}

export async function getUserInformationByEmail(email) {
	return await userRepository.findByEmail(data.email);
}
