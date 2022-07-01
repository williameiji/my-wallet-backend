import schemaSignin from "../schemas/schemaSignin.js";

async function signinValidator(req, res, next) {
	const { email, password } = req.headers;
	const user = {
		email,
		password,
	};

	const { error } = schemaSignin.validate(user);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	res.locals.user = user;

	next();
}

export default signinValidator;
