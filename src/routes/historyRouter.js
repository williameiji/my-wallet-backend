import { Router } from "express";
import {
	addHistory,
	getHistory,
	deleteHistory,
	editHistory,
} from "../controllers/historyControllers.js";
import verifyToken from "../infra/validators/tokenValidator.js";
import schemaValidator from "../infra/middlewares/schemaValidator.js";
import schemaInputData from "../infra/schemas/schemaInputData.js";
import schemaEditData from "../infra/schemas/schemaEditData.js";

const historyRouter = Router();

historyRouter.post(
	"/history",
	verifyToken,
	schemaValidator(schemaInputData),
	addHistory
);
historyRouter.get("/history", verifyToken, getHistory);

historyRouter.delete("/history/:id", verifyToken, deleteHistory);

historyRouter.put(
	"/history/:id",
	verifyToken,
	schemaValidator(schemaEditData),
	editHistory
);

export default historyRouter;
