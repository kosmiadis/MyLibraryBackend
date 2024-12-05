import User from '../models/user.js';
import { generateToken } from '../util/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    User.findUserByEmail(email)
    .then(user =>  {
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                const token = generateToken(user.email);
                return res.status(200).cookie('_t', token, {
                    httpOnly: true,       
                    secure: true,         
                    sameSite: 'Strict', 
                    maxAge: 1000 * 60 * 60 * 2, // 2 hours
                }).send({ 
                    isAuthorized: true,
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        age: user.age,
                        birthDate: user.birthDate,
                        email: user.email,
                        //books: []
                    }
                })}
            else {
                return res.status(400).send({ isAuthorized: false, message: 'Invalid Credentials!'})
            }
        })
    })
    .catch(e => {
        res.status(400).send({ isAuthorized: false, message: e.message })
    })
}

export const getLogout = async (req, res) => {
    return res.status(201).clearCookie('_t').send({ message: 'Logout Successful!'})
}

export const postSignup = async (req, res) => {
    const user = req.body?.user;

    User.findUserByEmail(user.email)
    .then(() => {
        return res.status(400).send({ isAuthorized: false, message: 'User already exists!'})
    })
    .catch(e => {
            User.createUser(user)
            .then(({ token, userId }) => {
                return res.status(201).cookie('_t', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 1000 * 60 * 60 * 2, // 2 hours
                }).send({ isAuthorized: true,
                    user: {
                        _id: userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        age: user.age,
                        birthDate: user.birthDate,
                        email: user.email
                    } })
            })
            .catch(e => {
                return res.status(400).send({ isAuthorized: false, message: e.message })
            })
        })
}

export const getUser = async (req, res) => {
    const token = req.cookies?._t
    const decoded = jwt.decode(token)

    User.findUserByEmail(decoded.email)
    .then(user => {
        return res.status(200).send({ user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            age: user.age,
            birthDate: user.birthDate,
            email: user.email
        } });
    })
    .catch(e => {
        return res.status(400).send({ message: e.message })
    })
}

export const updateUser = async (req, res) => {
    const token = req.cookies?._t
    const updatedCredentials = req.body?.updatedUser;
    const decoded = jwt.decode(token);

    User.findUserByEmail(decoded.email)
    .then(user => {
        User.updateUser(user.email, updatedCredentials)
        .then(({message}) => {
            return res.status(200).send({ message }) 
        })
    })
    .catch(e => {
        return res.status(400).send({ message: e.message })
    })
}

export const deleteUser = async (req, res) => {
    const token = req.cookies?._t
    const decoded = jwt.decode(token);
    
    User.deleteAccount(decoded.email)
    .then(responseMessage => {
        return res.status(200).send({ message: responseMessage })
    })
    .catch(e => {
        return res.status(400).send({ message: e.message });
    })
}