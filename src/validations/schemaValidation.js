import joi from "joi";

export const schemaNewUser = joi
	.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi
			.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required(),
		isPasswordEqual: joi.ref("password"),
	})
	.with("password", "isPasswordEqual");

export const schemaUser = joi.object({
	email: joi.string().email().required(),
	password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export const schemaInput = joi.object({
	value: joi.number().required(),
	description: joi.string().required(),
	type: joi.string(),
});

export const schemaEdit = joi.object({
	value: joi.number().required(),
	description: joi.string().required(),
});
