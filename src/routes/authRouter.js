import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import signupValidator from "../infra/validators/signupValidator.js";
import signinValidator from "../infra/validators/signinValidator.js";
import addNewUser from "../infra/middlewares/addNewUser.js";
import createToken from "../infra/middlewares/createToken.js";
import teste from "../infra/middlewares/teste.js";

const authRouter = Router();

authRouter.post("/signup", teste, signupValidator, addNewUser, signUp);
authRouter.post("/login", signinValidator, createToken, signIn);

export default authRouter;
