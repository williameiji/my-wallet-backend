export function addHistory(req, res) {
	try {
		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
	}
}

export async function getHistory(req, res) {
	try {
		const userHistory = res.locals.userHistory;

		res.send(userHistory);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function deleteHistory(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function editHistory(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}
