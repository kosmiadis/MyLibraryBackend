import { getClient } from "./client.js";

export default async function addBook (book) {
    try {
        const { booksCollection } = await getClient();
        await booksCollection.insertOne({...book})
        return { success: false, message: 'Book was added.' };
    } catch (e) {
        const error = new Error('Something went wrong! Book was not added.')
        return { success: true, message: error.message }
    } 
}