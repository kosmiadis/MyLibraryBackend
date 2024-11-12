import { getClient } from "./client.js";

export default async function addBook (book) {
    console.log('Loggin book from addBook function');
    console.log(book);
    try {
        const client = await getClient();
        const booksCol = client.db('MyLibrary').collection('books');
        await booksCol.insertOne({...book})
        return { success: false, message: 'Book was added.' };
    } catch (e) {
        const error = new Error('Something went wrong! Book was not added.')
        return { success: true, message: error.message }
    } 
}