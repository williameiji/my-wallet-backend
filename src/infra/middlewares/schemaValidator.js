export function schemaValidator(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) throw { code: "WrongType", message: "Dados incorretos." };

		next();
	};
}
