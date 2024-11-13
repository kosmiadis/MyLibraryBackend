import express from 'express';
import { addBook, getMyBook, getMyBooks } from '../controllers/books.js';
import validateFormData from '../middleware/validateFormData.js';

const booksRouter = express.Router();

booksRouter.get('/books', getMyBooks);
booksRouter.get('/books/:id', getMyBook);
booksRouter.post('/books/add-book',validateFormData, addBook);

export default booksRouter;