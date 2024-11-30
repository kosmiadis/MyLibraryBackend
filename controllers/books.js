import Book from '../models/book.js';

export const getBooks = async (req, res) => {
    Book.getAllBooks()
    .then((books) => {
        return res.status(200).send({ books: books || null });
    })
    .catch(e => {
        return res.status(400).send({ message: e.message })
    })
};

export const getBook = async (req, res) => {
    const params = req.params;
    const bookId = params?.id;
    //if id is initialized
    if (bookId) {
        Book.findBookById(bookId)
        .then(book => {
            return res.status(200).send({ book });
        })
        .catch(e => {
            return res.status(400).send({ message: e.message });
        })
    }
    else {
        //if id is null or undefined
        return res.status(400).send({ message: 'Book does not exist!', book: null });
    }
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
        newBook.save()
        .then(res => {
            return res.status(200).send({ message: res.message })
        })
        .catch(e => {
            return res.status(400).send({ message: e.message })
        })
    }
    else {
        res.status(400).send({ message: "Something went wrong!"})
    }
};

export const deleteBook = async (req, res) => {
    const body = req.body;
    const bookId = body?.id;
    //if id is found.
    if (bookId) {
        Book.deleteBook(bookId)
        .then(response => {
            return res.status(200).send({ message: response.message })
        })
        .catch(e => {
            return res.status(400).send({ message: e.message })
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