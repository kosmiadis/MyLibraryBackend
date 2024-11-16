import express from 'express';
import { addBook, deleteBookController, getMyBook, getMyBooks, updateBookController } from '../controllers/books.js';
import validateFormData from '../middleware/validateFormData.js';

const booksRouter = express.Router();

booksRouter.get('/books', getMyBooks);
booksRouter.get('/books/:id', getMyBook);
booksRouter.post('/books/add-book', validateFormData, addBook);
booksRouter.delete('/books/delete-book', deleteBookController);
booksRouter.patch('/books/update-book', validateFormData, updateBookController);
export default booksRouter;