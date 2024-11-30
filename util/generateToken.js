import jwt from "jsonwebtoken";

export function generateToken (email) {
    const token = jwt.sign({ email }, process.env.SECRET_JWT_KEY, { expiresIn: '2h' });
    return token;
}