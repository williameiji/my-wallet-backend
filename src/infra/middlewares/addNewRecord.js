import db from "../../databases/mongo.js";
import dayjs from "dayjs";

async function addNewRecord(req, res, next) {
	const userDecoded = res.locals.userDecoded;
	const newRecord = res.locals.newRecord;

	const user = await db.collection("users").findOne({
		email: userDecoded.data,
	});

	if (!user) return res.sendStatus(404);

	await db.collection("history").insertOne({
		email: user.email,
		...newRecord,
		date: dayjs().format("DD-MM"),
	});

	next();
}

export default addNewRecord;
