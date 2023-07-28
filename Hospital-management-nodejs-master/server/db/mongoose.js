// Require the MongoDB Node.js driver
const { MongoClient } = require("mongodb");

// Connection URL and database name
const url = "mongodb://139.5.248.188:27017";
const dbName = "myDatabase";

// Function to connect to the MongoDB server
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return null;
  }
}

// Function to insert a document into a collection
async function insertDocument(collectionName, document) {
  const db = await connectToDatabase();
  if (!db) return;

  const collection = db.collection(collectionName);

  try {
    const result = await collection.insertOne(document);
    console.log("Document inserted:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  }
}

// Function to find documents in a collection based on a query
async function findDocuments(collectionName, query) {
  const db = await connectToDatabase();
  if (!db) return;

  const collection = db.collection(collectionName);

  try {
    const cursor = await collection.find(query);
    const documents = await cursor.toArray();
    console.log("Found documents:", documents);
  } catch (error) {
    console.error("Error finding documents:", error);
  }
}
