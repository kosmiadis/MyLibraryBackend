import { ObjectId } from "mongodb";
import { getClient } from "../db/client.js";

const { booksCollection } = await getClient();

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
    async save() {
        const book = {
            title: this.title,
            description: this.description,
            author: this.author,
            imgUrl: this.imgUrl,
            personalRating: this.personalRating,
            price: this.price,
            isRead: this.isRead,
        }

        try {
            booksCollection.insertOne({...book})
            .then(() => {
                return {message: 'Book was added'};
            })
        } catch (e) {
            throw new Error('Something went wrong! Book was not added.')
        } 
    }

    static async findBookById (id) {
        try {
            const book = booksCollection.findOne({ _id: ObjectId.createFromHexString( id ) });
            return book;
            
          } catch (e) {
            throw new Error('Could not load book!')
          }
    }

    static async getAllBooks () {
        try {
            const books = await booksCollection.find().toArray();
            return books;
        } catch (e) {
            throw new Error('Could not load books.');
        }
    }

    static async deleteBook (id) {
        try {
            const delRes = await booksCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });
            
            if ( delRes.deletedCount === 1) {
                return { message: 'Book was deleted.'}
            }
            else {
                throw new Error('Book was not deleted!')
            }
            
        } catch (e) {
            throw new Error(e.message);
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
                return { message: 'Book was updated.' };
            }
            else {
                throw new Error('Book was not updated!')
            }
        } catch (e) {
            throw new Error(e.message);
        }}
}