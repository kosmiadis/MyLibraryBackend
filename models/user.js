import { generateToken } from "../util/generateToken.js";
import { getClient } from "../db/client.js";
import bcrypt from 'bcrypt';

export default class User {
    constructor (firstName, lastName, age, birthDate, username, password) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.age = age,
        this.birthDate = birthDate,
        this.username = username,
        this.username = username,
        this.password = password
    }

    static async createUser(user) {
        try {
            const { usersCollection } = await getClient();
            const encryptedPass = await bcrypt.hash(user.password, 12)
            const { insertedId } = await usersCollection.insertOne({...user, password: encryptedPass});
            if (insertedId) {
                return { token: generateToken(user.email), userId: insertedId};
            }
            else {
                throw new Error('Account was not created! Try again later.')
            }
            
        } catch (e) {
            throw new Error('Something went wrong. Account was not created!')
        }
    }

    static async findUserByEmail(email) {
        try {
            const { usersCollection } = await getClient();
            return await usersCollection.findOne({ email });
        } catch (e) {
            const error = new Error('Could not find User!')
            throw error
        };
    }

    static async updateUser (email, updatedUser) {
        try {
            const { usersCollection } = await getClient();
            const updateAction = await usersCollection.updateOne({ email: email }, {
                $set: {
                    ...updatedUser
                }
            })
            if (updateAction.modifiedCount === 1) {
                return { message: `${email} account was updated.`}
            }
            else {
                throw new Error('Something went wrong updating user! ')
            }
        } catch (e) {
            throw new Error('Could not update User! Try again later.')
        };
    }
}