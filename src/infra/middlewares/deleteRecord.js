import { ObjectId } from "mongodb";
import db from "../../databases/mongo.js";

async function deleteRecord(req, res, next) {
	const { id } = req.params;

	const informationToDelete = await db
		.collection("history")
		.findOne({ _id: ObjectId(`${id}`) });

	if (!informationToDelete) return res.sendStatus(404);

	await db.collection("history").deleteOne(informationToDelete);

	next();
}

export default deleteRecord;
