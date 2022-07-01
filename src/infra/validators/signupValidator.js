import schemaSignup from "../schemas/schemaSignup.js";

async function signupValidator(req, res, next) {
	const newUser = req.body;
	console.log(newUser);
	const { error } = schemaSignup.validate(newUser);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	res.locals.newUser = newUser;

	next();
}

export default signupValidator;
