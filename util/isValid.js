export function isValid (value, inputType, errors) {

    const validation = { isValid: true, errMessage: null };
    
    if (inputType === 'personal_rating' || inputType === 'price') {
        if (value === NaN) {
            validation.isValid = false;
            validation.errMessage = 'Please fill all empty fields!'
        }
        if (inputType === 'personal_rating' && !(value > 0 & value < 10)) {
            validation.isValid = false;
            validation.errMessage = 'Personal Rating must range from 1 to 10!'
        }
        if (inputType === 'price' && value < 0) {
            validation.isValid = false;
            validation.errMessage = 'Price cannot be negative!'  
        }
    }
    if (inputType === 'is_read') {
        if (value === undefined || value === null) {
            validation.isValid = false;
            validation.errMessage = 'Please define read status!'        
        }
    }
    if (value === '') {
        validation.isValid = false;
        validation.errMessage = 'Please fill all empty fields!'
    }

    //push validation object only if validation failed
    if (validation.isValid === false) {
        errors.push(validation);
    }
}