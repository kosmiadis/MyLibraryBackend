import { ObjectId } from "mongodb";
import { getClient } from "../db/client.js";

const { booksCollection, usersCollection } = await getClient();

export default class Book {
    
    constructor(title, description, author, imgUrl, price, isRead,type) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.imgUrl = imgUrl;
        this.price = price;
        this.type = type // Wishlist or In possesion
        this.isRead = isRead
    }

    //saves the book
    async save(user) {
        const book = {
            _id: new ObjectId(),
            title: this.title,
            description: this.description,
            author: this.author,
            imgUrl: this.imgUrl,
            type: this.type,
            price: this.price,
            isRead: this.isRead,
        }

        try {
            const result = await usersCollection.updateOne({ email: user.email }, {
                $push: { books: book }
            })

            if (result.modifiedCount === 0) {
                throw new Error('Book was not added!')
            }
            return 'Book was added';
        } catch (e) {
            throw new Error('Something went wrong! Book was not added.')
        }
    }

    static async findBookById (user, id) {
        try {
            const foundUser = await usersCollection.findOne({ email: user.email });
            const books = foundUser?.books || [];
            
            // Properly compare ObjectId
            const book = books.find(b => b._id.equals(ObjectId.createFromHexString(id)));
            if (!book) {
                throw new Error('Book not found!');
            }
            return book;
        } catch (e) {
            throw new Error('Could not load book!');
        }
    }

    static async getAllBooks (user) {
        try {
            const foundUser = await usersCollection.findOne({ email: user.email });
            return foundUser?.books;
        } catch (e) {
            throw new Error('Could not load books.');
        }
    }

    static async deleteBook (user, id) {
        try {
            const foundUser = await usersCollection.findOne({ email: user.email });
            const books = foundUser?.books;
            const updatedBooks = books.filter(b => !(b._id.equals(ObjectId.createFromHexString(id))));
    
            
            const updated = await usersCollection.updateOne({ email: user.email }, {
                $set: { books: updatedBooks }
            })
            if (updated.modifiedCount === 0) {
                throw new Error('Book was not deleted');
            }
            return 'Book was deleted'
        } catch (e) {
            throw new Error('Book was not deleted!');
        } 
    }

    static async updateBook (book) {
        const { id, title, description, author, personal_rating, price, img_url, isRead } = book;

        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('Something went wrong! Please try again later.');
            }
            const updateRes = await booksCollection.updateOne({ _id: ObjectId.createFromHexString( id )}, {
                $set: {
                    title: title,
                    description: description,
                    author: author,
                    personalRating: personal_rating,
                    price: price,
                    imgUrl: img_url,
                    isRead: isRead
                },
            })
            if (updateRes.modifiedCount === 1) {
                throw new Error('Book was not updated.');
            }
        } catch (e) {
            throw new Error('Something went wrong book was not added!');
        }}
}