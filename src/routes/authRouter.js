import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import schemaSignin from "../infra/schemas/schemaSignin.js";
import schemaSignup from "../infra/schemas/schemaSignup.js";
import { schemaValidator } from "../infra/middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemaSignup), signUp);
authRouter.post("/login", schemaValidator(schemaSignin), signIn);

export default authRouter;
