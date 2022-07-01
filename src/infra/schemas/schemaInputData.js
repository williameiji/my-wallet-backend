import joi from "joi";

const schemaInputData = joi.object({
	value: joi.number().required(),
	description: joi.string().required(),
	type: joi.any().valid("input", "output").required(),
});

export default schemaInputData;
