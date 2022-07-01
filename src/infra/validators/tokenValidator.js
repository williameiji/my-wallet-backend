import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function verifyToken(req, res, next) {
	const getToken = req.headers["authorization"];
	const token = getToken?.replace("Bearer ", "");

	if (!token) {
		return res.status(403).send("Um token é necessario para autenticação");
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
		res.locals.userDecoded = decoded;
		next();
	} catch (err) {
		return res.status(401).send("Token inválido");
	}
}

export default verifyToken;
