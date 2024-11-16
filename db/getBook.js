import { ObjectId } from "mongodb";
import { getClient } from "./client.js";

export default async function getBook (id) {  
  
  try {
    const { booksCollection } = await getClient();
    const book = await booksCollection.findOne({ _id: ObjectId.createFromHexString( id ) });
    return { err: false, book: book }; // { err: false, book: [...]}
  } catch (e) {
    const error = new Error('Could not load book!')
    return { err: error.message, book: null };
  }
}