import * as historyRepository from "../repositories/historyRepository.js";
import * as userRepository from "../repositories/userRepository.js";

export async function addHistory(email, data) {
	const user = await userRepository.getUserInformationByEmail(email);

	checkIfUserExist(user);

	await historyRepository.addNewRecord(email, data);
}

export async function getHistory(data) {
	const user = await userRepository.getUserInformationByEmail(data.data);

	checkIfUserExist(user);

	const userHistory = await historyRepository.findByEmail(user.email);

	return userHistory;
}

export async function deleteHistory(id) {
	const informationToDelete = await getHistoryInformationById(id);

	checkIfInformationsExist(informationToDelete);

	await historyRepository.deleteHistory(informationToDelete);
}

export async function editHistory(id, data) {
	const informationToEdit = await getHistoryInformationById(id);

	checkIfInformationsExist(informationToEdit);

	await historyRepository.editHistory(informationToEdit, data);
}

async function getHistoryInformationById(id) {
	return await historyRepository.findById(id);
}

function checkIfUserExist(user) {
	if (!user) throw { code: "NotFound", message: "Usuário não encontrado!" };
}

function checkIfInformationsExist(informations) {
	if (!informations)
		throw { code: "NotFound", message: "Registro não encontrado!" };
}
