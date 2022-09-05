export default async function errorHandler(error, req, res, next) {
	if (error.code === "WrongType") return res.status(422).send(error.message);
	if (error.code === "Anauthorized") return res.status(401).send(error.message);
	if (error.code === "NotFound") return res.status(404).send(error.message);

	res.sendStatus(500);
}
