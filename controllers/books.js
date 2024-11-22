import Book from '../models/book.js';
import getBook from '../db/getBook.js'
import deleteBook from '../db/deleteBook.js';
import updateBook from '../db/updateBook.js';


export const getMyBooks = async (req, res) => {
    Book.allBooks((err, books) => {
        if (!err) {
            return res.status(200).send({ books });
        }
        return res.status(400).send({ books: null, errorMessage: err.message })
    }) 
};

export const getMyBook = async (req, res) => {
    const params = req.params;
    const bookId = params?.id;
    //if id is initialized
    if (bookId) {
        const { err, book } = await getBook(bookId);
        if (!err) {
            return res.status(200).send({ err, book });
        }
        return res.status(400).send({err, book: null});
    }
    //if id is null or undefined
    return res.status(400).send({ errorMessage: 'Book does not exist!', book: null });
}

export const addBook = async (req, res) => {
    
    const book = req.body?.book;

    if (book) {
        const { 
            title, 
            description, 
            author, 
            img_url, 
            personal_rating, 
            price, 
            isRead
        } = book;

        const newBook = new Book(
            title, 
            description, 
            author, 
            img_url, 
            personal_rating, 
            price, 
            isRead
        );
    
        //save the book to the db.
        newBook.save((err, response) => {
            if (!err) {
                return res.status(200).send({ response });
            }
            return res.status(400).send({ response: err })
        });
    }
    else {
        res.status(400).send({ response: "Something went wrong!"})
    }
};

export const deleteBookController = async (req, res) => {
    const body = req.body;
    const bookId = body?.id;
    //if id is found.
    if (bookId) {
        const { err, message } = await deleteBook(bookId);
        if (!err) {
            return res.status(200).send({ message });
        }
        return res.status(400).send({ message });
    }

    //if id is null or undefined.
    return res.status(400).send({ message: 'Could not find book to delete!' });
}

export const updateBookController = async (req, res) => {
    const book = req.body?.book;

    if (book) {        
        const { err, message } = await updateBook(book);
        if (!err) {
            return res.status(200).send({ message });
        }
        return res.status(400).send({ message });
    }
    else {
        res.status(400).send({ response: "Something went wrong!"})
    }
}