import { getClient } from "./client.js";
import { ObjectId } from "mongodb";

export default async function updateBook (book) {
    const { id, title, description, author, personal_rating, price, img_url, isRead } = book;

    try {

        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        const { booksCollection } = await getClient();
        const update = await booksCollection.updateOne({ _id: ObjectId.createFromHexString( id )}, {
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
        if (update.modifiedCount === 1) {
            return { err: false, message: 'Book was updated.' };
        }
        return { err: true, message: 'Book was not found to update!' }
        
    } catch (e) {
        const error = new Error('Something went wrong! Book was not updated.')
        return { err: true, message: error.message }
    }
};