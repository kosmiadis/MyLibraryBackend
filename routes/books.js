import express from 'express';
import { addBook, getMyBook, getMyBooks } from '../controllers/books.js';

const booksRouter = express.Router();

booksRouter.get('/books', getMyBooks);
booksRouter.get('/books/:id', getMyBook);
booksRouter.post('/books/add-book', addBook);

export default booksRouter;