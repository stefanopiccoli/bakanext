import clientPromise from ".";

let client;
let db;
let products;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("bakastyle");
    products = await db.collection("products");
  } catch (error) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

//PRODUCTS

export async function getProducts() {
  try {
    if (!products) await init();
    const result = await products.find({}).limit(5).toArray();
    return { products: result };
  } catch (error) {
    return { error: "Failed to fetch products!" };
  }
}
