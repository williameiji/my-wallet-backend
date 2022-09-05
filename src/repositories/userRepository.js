import db from "../databases/mongo.js";

export async function findByEmail(email) {
	return await db.collection("users").findOne({
		email: newUser.email,
	});
}

export async function addNewUser(user, encryptedPassaword) {
	await db.collection("users").insertOne({
		name: user.name,
		email: user.email,
		password: encryptedPassaword,
	});
}
