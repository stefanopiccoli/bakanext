import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from ".";

export let client : MongoClient;
export let db : Db;
export let products : Collection;

export async function init() {
  if (db) return;
  try {
    client = await connectToDatabase();
    db = client.db("bakastyle");
    products = db.collection("products");
    console.log("Connected to MongoDB!");
    
  } catch (error) {
    throw new Error("Failed to establish connection to database");
  }
}

init()