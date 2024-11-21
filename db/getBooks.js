import { getClient } from "./client.js";

export default async function getBooks () {
      try {
        const { booksCollection } = await getClient();
        const books = await booksCollection.find().toArray()
        return { err: false, books: books }; // { err: false, books: [...]}
      } catch (e) {
        const error = new Error('Could not load books.', { cause: e });
        return { err: error, books: null}
      }
}