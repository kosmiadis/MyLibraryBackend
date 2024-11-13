import Book from '../models/book.js';
import getBook from '../db/getBook.js'
import { isValid } from '../util/isValid.js';

export const getMyBooks = async (req, res) => {

    const isReadQuery = req.query['isRead'];
    const isRead = isReadQuery === 'true';

    Book.allBooks((err, books) => {
        if (!err) {
            const filteredBooks = [...books].filter(book => book.isRead === isRead);
            return res.status(200).send({ books: filteredBooks });
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
        return res.status(400).send({err, book: []});
    }
    //if id is null or undefined
    return res.status(400).send({ errorMessage: 'Book does not exist!', book: [] });
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