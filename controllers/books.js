import Book from '../models/book.js';
import User from '../models/user.js';
import { decodeToken } from '../util/decodeToken.js'

export const getBooks = async (req, res) => {
    const authToken = req?.cookies._t;
    const decodedUser = decodeToken(authToken);
    User.findUserByEmail(decodedUser.email)
    .then(user => {
        Book.getAllBooks(user)
        .then((books) => {
            return res.status(200).send({ books: books || null });
        })
        .catch(e => {
            return res.status(400).send({ message: e.message })
        })
    })
};

export const getBook = async (req, res) => {
    const params = req.params;
    const bookId = params?.id;
    const authToken = req?.cookies._t;
    const decodedUser = decodeToken(authToken);
    //if id is initialized
    if (bookId) {
        User.findUserByEmail(decodedUser.email)
        .then(user => {
            Book.findBookById(user, bookId)
            .then(book => {
                return res.status(200).send({ book });
            })
            .catch(e => {
                return res.status(400).send({ message: e.message });
            })
        })
        
    }
    else {
        //if id is null or undefined
        return res.status(400).send({ message: 'Book does not exist!', book: null });
    }
}

export const addBook = async (req, res) => {
    
    const book = req.body?.book;

    //widdleware takes care if token is not valid or undefined.
    const authToken = req.cookies?._t;
    const decodedToken = decodeToken(authToken);
    const {
        title,
        author,
        description,
        price,
        imgUrl,
        isRead,
        type,
    } = book;

    const newBook = new Book(
        title,
        description,
        author,
        imgUrl,
        price,
        isRead,
        type
    );

    User.findUserByEmail(decodedToken.email)
    .then(user => {
        newBook.save(user)
        .then(responseMessage => {
            return res.status(200).send({ message: responseMessage })
        })
        .catch(e => {
            return res.status(400).send({ message: e.message })
        })
    })
    .catch(() => {
        return res.status(400).send({ message: 'Something went wrong! Try again later.'})
    })
};

export const deleteBook = async (req, res) => {
    const body = req.body;
    const bookId = body?.id;
    const authToken = req.cookies?._t;
    const decodedToken = decodeToken(authToken);
    //if id is found.
    if (bookId) {
        User.findUserByEmail(decodedToken.email)
        .then(user => {
            Book.deleteBook(user, bookId)
            .then(response => {
                return res.status(200).send({ message: response })
            })
            .catch(e => {
                return res.status(400).send({ message: e.message })
            })
        })
    }
    else {
        //if id is null or undefined.
        return res.status(400).send({ message: 'Could not find book!' });
    }
}

export const updateBook = async (req, res) => {
    const book = req.body?.book;

    if (book) {        
        Book.updateBook(book)
        .then(updateRes => {
            return res.status(200).send({ message: updateRes.message});
        })
        .catch(e => {
            return res.status(400).send({ message: e.message });
        })
    }
    else {
        return res.status(400).send({ message: 'Something went wrong!'})
    }
}