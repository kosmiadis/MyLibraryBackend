import { ObjectId } from "mongodb";
import { getClient } from "./client.js";

export default async function getBook (id) {  
  try {
    const client = await getClient();
    const booksCol = client.db('MyLibrary').collection('books');
    const book = await booksCol.findOne({ _id: ObjectId.createFromHexString(id) });
    return { err: false, book: book }; // { err: false, book: [...]}
  } catch (e) {
    const error = new Error('Could not load book!')
    return { err: error.message, book: null };
  }
}