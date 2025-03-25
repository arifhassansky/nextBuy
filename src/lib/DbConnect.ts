import { MongoClient, ServerApiVersion } from "mongodb";

export const dbName = {
  usersCollection: "users",
};

export default async function dbConnect(collection) {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    console.log("connected to mongodb");
    return client.db("NextBuy").collection(collection);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Database connection failed");
  }
}
