import schemaInputData from "../schemas/schemaInputData.js";

async function newRecordValidator(req, res, next) {
	const newRecord = req.body;
	const { error } = schemaInputData.validate(newRecord);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	res.locals.newRecord = newRecord;

	next();
}

export default newRecordValidator;
