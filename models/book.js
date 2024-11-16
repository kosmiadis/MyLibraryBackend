import addBook from "../db/addBook.js";
import getBooks from "../db/getBooks.js";

export default class Book {
    
    constructor(title, description, author, imgUrl, personalRating, price, isRead) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.imgUrl = imgUrl;
        this.personalRating = personalRating;
        this.price = price;
        this.isRead = isRead;
    }

    //saves the book
    async save(cb) {
        const book = {
            title: this.title,
            description: this.description,
            author: this.author,
            imgUrl: this.imgUrl,
            personalRating: this.personalRating,
            price: this.price,
            isRead: this.isRead,
        }

        const { success, message } = await addBook(book);
        return cb(success, message);
    }

    static async allBooks (cb) {
        const { err, books } = await getBooks();
        return cb(err, books)
    }
}