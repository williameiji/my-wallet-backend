import { ObjectId } from "mongodb";
import db from "../../databases/mongo.js";

async function editRecord(req, res, next) {
	const { id } = req.params;
	const dataToEdit = res.locals.dataToEdit;
	const informationToEdit = await db
		.collection("history")
		.findOne({ _id: ObjectId(`${id}`) });

	if (!informationToEdit) return res.sendStatus(404);

	await db.collection("history").updateOne(informationToEdit, {
		$set: {
			...dataToEdit,
		},
	});

	next();
}

export default editRecord;
