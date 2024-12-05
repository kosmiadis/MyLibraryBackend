import { ObjectId, } from "mongodb";
import { getClient } from "../db/client.js";

const { usersCollection } = await getClient();

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
            const result = await usersCollection.aggregate([
                { $match: { email: user.email } },
                {
                    $project: {
                        books: {
                            $filter: {
                                input: "$books",
                                as: "book",
                                cond: { $eq: ["$$book._id", ObjectId.createFromHexString(id)] }
                            }
                        }
                    }
                }
            ]).toArray();
            const foundBookList = result[0].books;
            if (foundBookList?.length === 0) {
                throw new Error('Book not found!');
            }
            return foundBookList?.[0];
        } catch (e) {
            throw new Error('Could not load book!');
        }
    }

    static async getAllBooks (user) {
        try {
            const foundUser = await usersCollection.findOne({ email: user.email });
            const books = foundUser?.books;
            return books;
        } catch (e) {
            throw new Error('Could not load books.');
        }
    }

    static async deleteBook (user, id) {
        try {
            const updated = await usersCollection.updateOne(
                { email: user.email },
                { $pull: { books: { _id: ObjectId.createFromHexString(id) } } }
            );

            if (updated.modifiedCount === 0) {
                throw new Error('Book not found or already deleted');
            }
            return 'Book was successfully deleted';

        } catch (e) {
            throw new Error('Book was not deleted!');
        } 
    }

    static async updateBook (user, updatedBook) {
        try {
            const updated = await usersCollection.updateOne(
                { email: user.email, "books._id": ObjectId.createFromHexString(updatedBook.id) }, // Match email and specific book
                {
                    $set: {
                        "books.$.title": updatedBook.title,
                        "books.$.author": updatedBook.author,
                        "books.$.description": updatedBook.description,
                        "books.$.price": updatedBook.price,
                        "books.$.imgUrl": updatedBook.imgUrl,
                        "books.$.type": updatedBook.type
                    }
                }
            );

            if (updated.modifiedCount === 0) {
                throw new Error('Book was not updated.');
            }
            return 'Book was updated!'
        } catch (e) {
            throw new Error('Something went wrong book was not added!');
        }}
}