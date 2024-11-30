import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();
const uri = process.env.MONGO_DB_CONNECTION_STRING;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

let isConnected = false;

export async function getClient() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }

  const booksCollection = client.db('MyLibrary').collection('books');
  const usersCollection = client.db('MyLibrary').collection('users');


  return { booksCollection, usersCollection, client };
}