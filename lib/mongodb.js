import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bm2group";
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      console.warn("MongoDB connection warning:", err.message);
      return null;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.warn("MongoDB connection warning:", err.message);
    return null;
  });
}

export default clientPromise;

export async function getDatabase() {
  try {
    const client = await clientPromise;
    if (!client) return null;
    return client.db("bm2group");
  } catch (error) {
    console.warn("Failed to get MongoDB database:", error.message);
    return null;
  }
}
