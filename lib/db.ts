import { MongoClient, type MongoClientOptions, type Db, type Collection, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const DEFAULT_DB_NAME = (() => {
  if (process.env.MONGODB_DB_NAME && process.env.MONGODB_DB_NAME.trim().length > 0) {
    return process.env.MONGODB_DB_NAME.trim();
  }

  try {
    const parsed = new URL(uri);
    const pathname = parsed.pathname.replace("/", "").trim();
    return pathname || "campusconnect";
  } catch {
    return "campusconnect";
  }
})();

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(dbName?: string): Promise<Db> {
  const mongoClient = await clientPromise;
  const targetDb = dbName ?? DEFAULT_DB_NAME;
  return mongoClient.db(targetDb);
}

export async function getCollection<TSchema extends Document = Document>(
  collectionName: string,
  dbName?: string
): Promise<Collection<TSchema>> {
  const db = await getDb(dbName);
  return db.collection<TSchema>(collectionName);
}
