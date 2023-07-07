import { MongoClient } from "mongodb";

export async function connectToDatabase () {
const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error("Please add your Mongo URI to .env.local");

let client = new MongoClient(URI, options);

return await client.connect();
}
