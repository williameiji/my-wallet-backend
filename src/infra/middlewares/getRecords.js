import db from "../../databases/mongo.js";

async function getRecords(req, res, next) {
	const userDecoded = res.locals.userDecoded;

	const user = await db.collection("users").findOne({
		email: userDecoded.data,
	});

	if (!user) return res.sendStatus(404);

	const userHistory = await db
		.collection("history")
		.find({ email: user.email })
		.toArray();

	res.locals.userHistory = userHistory;

	next();
}

export default getRecords;
