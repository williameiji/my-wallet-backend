import joi from "joi";

const schemaEditData = joi.object({
	value: joi.number().required(),
	description: joi.string().required(),
});

export default schemaEditData;
