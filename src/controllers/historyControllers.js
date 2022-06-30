import { schemaInput, schemaEdit } from "../validations/schemaValidation.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../databases/mongo.js";

export async function addHistory(req, res) {
	const { error } = schemaInput.validate(req.body);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	try {
		const user = await db.collection("users").findOne({
			email: req.user.data,
		});

		if (!user) return res.sendStatus(404);

		await db.collection("history").insertOne({
			email: user.email,
			...req.body,
			date: dayjs().format("DD-MM"),
		});

		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
	}
}

export async function getHistory(req, res) {
	try {
		const user = await db.collection("users").findOne({
			email: req.user.data,
		});

		if (!user) return res.sendStatus(404);

		const userHistory = await db
			.collection("history")
			.find({ email: user.email })
			.toArray();

		res.send(userHistory);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function deleteHistory(req, res) {
	const { id } = req.params;

	try {
		const informationToDelete = await db
			.collection("history")
			.findOne({ _id: ObjectId(`${id}`) });

		if (!informationToDelete) return res.sendStatus(404);

		await db.collection("history").deleteOne(informationToDelete);

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function editHistory(req, res) {
	const { id } = req.params;

	const { error } = schemaEdit.validate(req.body);

	if (error) return res.status(422).send("Todos os campos são obrigatórios!");

	try {
		const informationToEdit = await db
			.collection("history")
			.findOne({ _id: ObjectId(`${id}`) });

		if (!informationToEdit) return res.sendStatus(404);

		await db.collection("history").updateOne(informationToEdit, {
			$set: {
				...req.body,
			},
		});

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
}
