import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);

await mongoClient.connect();
const db = mongoClient.db(process.env.DATABASE_NAME);

export default db;
