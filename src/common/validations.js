// Ac Name validation
export const validateName = (name) => {
    const errors = {}; // Object to hold error messages

    // Check if the name contains only alphabets
    if (!/^[A-Za-z\s]+$/.test(name)) {
        errors.alphabet = 'Name must contain only alphabets';
    } else if (name.length < 3) {
        errors.length = 'Name must be 3 characters long';
    }
    return errors;
};

// Number validation
export const validateNumber = (value) => {
    // const numberRegex = /^[1-9]\d*(\.\d+)?$/;
    // return numberRegex.test(value);
    return value > 0
}