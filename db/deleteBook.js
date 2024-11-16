import { getClient } from "./client.js";
import { ObjectId } from "mongodb";

export default async function deleteBook (id) {
    try {
        const { booksCollection } = await getClient();
        const deleteResponse = await booksCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });
        if ( deleteResponse.deletedCount === 1) {
            return { err: false, message: 'Book was deleted.' };
        }
        return { err: true, message: 'Book was not deleted' };
    } catch (e) {
        return { err: true, message: 'Something went wrong! Book was not delete.' }
    } 
}