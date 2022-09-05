import * as historyServices from "../services/historyServices.js";

export async function addHistory(req, res) {
	const userDecoded = res.locals.userDecoded;
	const newRecord = req.body;

	await historyServices.addHistory(userDecoded, newRecord);

	res.sendStatus(201);
}

export async function getHistory(req, res) {
	const userDecoded = res.locals.userDecoded;

	const userHistory = await historyServices.getHistory(userDecoded);

	res.status(200).send(userHistory);
}

export async function deleteHistory(req, res) {
	const { id } = req.params;

	await historyServices.deleteHistory(id);

	res.sendStatus(200);
}

export async function editHistory(req, res) {
	const { id } = req.params;
	const dataToEdit = res.locals.dataToEdit;

	await historyServices.editHistory(id, dataToEdit);

	res.sendStatus(200);
}
