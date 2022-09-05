import db from "../databases/mongo.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function addNewRecord(email, data) {
	await db.collection("history").insertOne({
		email: email,
		...data,
		date: dayjs().format("DD-MM"),
	});
}

export async function findByEmail(email) {
	await db.collection("history").find({ email: email }).toArray();
}

export async function findById(id) {
	await db.collection("history").findOne({ _id: ObjectId(`${id}`) });
}

export async function deleteHistory(data) {
	await db.collection("history").deleteOne(data);
}

export async function editHistory(informationToEdit, data) {
	await db.collection("history").updateOne(informationToEdit, {
		$set: {
			...data,
		},
	});
}
