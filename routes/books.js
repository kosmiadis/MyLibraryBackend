import express from 'express';
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/books.js';
import validateFormData from '../middleware/validateFormData.js';
import { checkAuth } from '../middleware/checkAuth.js';

const booksRouter = express.Router();

booksRouter.get('/books', checkAuth, getBooks);
booksRouter.get('/books/:id', checkAuth, getBook);
booksRouter.post('/books/add-book', checkAuth, validateFormData, addBook);
booksRouter.delete('/books/delete-book', checkAuth, deleteBook);
booksRouter.patch('/books/update-book', checkAuth, validateFormData, updateBook);

export default booksRouter;