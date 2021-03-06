import joi from "joi";

const schemaSignup = joi
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

export default schemaSignup;
