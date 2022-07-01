import { Router } from "express";

import {
	addHistory,
	getHistory,
	deleteHistory,
	editHistory,
} from "../controllers/historyControllers.js";
import addNewRecord from "../infra/middlewares/addNewRecord.js";

import verifyToken from "../infra/validators/tokenValidator.js";
import newRecordValidator from "../infra/validators/newRecordValidator.js";
import getRecords from "../infra/middlewares/getRecords.js";
import deleteRecord from "../infra/middlewares/deleteRecord.js";
import editRecord from "../infra/middlewares/editRecord.js";
import editRecordValidator from "../infra/validators/editRecordValidator.js";

const historyRouter = Router();

historyRouter.post(
	"/history",
	verifyToken,
	newRecordValidator,
	addNewRecord,
	addHistory
);
historyRouter.get("/history", verifyToken, getRecords, getHistory);
historyRouter.delete("/history/:id", verifyToken, deleteRecord, deleteHistory);
historyRouter.put(
	"/history/:id",
	verifyToken,
	editRecordValidator,
	editRecord,
	editHistory
);

export default historyRouter;
