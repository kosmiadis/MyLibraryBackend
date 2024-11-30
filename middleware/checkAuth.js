import jwt from 'jsonwebtoken'

export function checkAuth (req, res, next) {
    const token = req.cookies?._t
    
    if (!token) {
        return res.status(401).send({ isAuthorized: false, message: 'Unauthorized' });
    }

    try {
        const isValid = jwt.verify(token, process.env.SECRET_JWT_KEY);
        if (isValid) {
            next();
        } else {
            return res.status(400).send({ isAuthorized: false, message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(400).send({ isAuthorized: false, message: error.message });
    }
}