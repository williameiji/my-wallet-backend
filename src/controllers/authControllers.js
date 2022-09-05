import * as authServices from "../services/authServices.js";

export async function signUp(req, res) {
	const user = req.body;

	await authServices.signUp(user);

	res.status(201).send("Usuário cadastrado com sucesso!");
}

export async function signIn(req, res) {
	const user = req.body;

	const loginInformation = await authServices.signIn(user);

	res
		.status(200)
		.send({ token: loginInformation.token, name: loginInformation.name });
}
