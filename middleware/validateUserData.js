export function validateUserLoginData (req, res, next) {
    const email = req.body?.email;
    const password = req.body?.password;

    if (isEmpty(email) || isEmpty(password)) {
        return res.status(400).send({ isAuthorized: false, message: 'Please fill empty inputs!'})
    }
    return next();
}

export function validateUserSignupData (req, res, next) {
    const firstName = req.body?.user.firstName;
    const lastName = req.body?.user.lastName;
    const email = req.body?.user.email;
    const password = req.body?.user.email;
    const age = req.body?.user.age;
    const username = req.body?.user.username;

    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(username) || isEmpty(password)) {
        return res.status(400).send({ isAuthorized: false, message: 'Please fill empty inputs!'})
    }
    else if (!isValidAge(age)) {
        return res.status(400).send({ isAuthorized: false, message: 'Minimum age is 12 years old!'})
    }
    return next();
}



function isEmpty (value) {
    return value.trim() === ''
}

function isValidAge (value) {
    return value >= 12
}