import schemaEditData from "../schemas/schemaEditData.js";

async function editRecordValidator(req, res, next) {
	const dataToEdit = req.body;
	const { error } = schemaEditData.validate(dataToEdit);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	res.locals.dataToEdit = dataToEdit;

	next();
}

export default editRecordValidator;
