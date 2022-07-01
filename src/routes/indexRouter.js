import { Router } from "express";
import authRouter from "./authRouter.js";
import historyRouter from "./historyRouter.js";

const router = Router();

router.use(authRouter);
router.use(historyRouter);

export default router;
