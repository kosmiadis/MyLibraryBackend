import {isValid} from "../util/isValid.js";

const validateFormData = (req, res, next) => {
    const { 
        title, 
        description, 
        author, 
        imgUrl, 
        type, 
        price, 
        isRead
    } = req.body?.book;

    const validateData = [
        {value: title, type: 'text'},
        {value: description, type: 'text'},
        {value: author, type: 'text'},
        {value: imgUrl, type: 'text'},
        {value: type, type: 'text'},
        {value: price, type: 'price'},
        {value: isRead, type: 'isRead'},
    ]

    const errors = [];
    //validate data, if errors found, they will be appended to the errors list.
    for (let d of validateData) {
        isValid(d.value, d.type, errors);
    }
    
    const validationPassed = errors.length === 0;

    if (!validationPassed) {
        const uniqueErrors  =
        [...new Set(errors.map(JSON.stringify))].map(JSON.parse);
        return res.status(400).send(uniqueErrors);
    }
    next();
}

export default validateFormData;