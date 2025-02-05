
const {User , validateUserSignUp} = require('../models/account.model');
const bcrypt = require('bcrypt');


const handleDuplicateError = (error) => {
    const duplicatedField = Object.keys(error.keyPattern)[0];
    switch (duplicatedField) {
        case 'login':
            return { status: 400, message: {loginExists :'Login already exists'} };
        case 'email':
            return { status: 400, message: {emailExists : 'Email already exists'} };
        default:
            return { status: 400, message: 'Duplicate field error' };
    }
};
exports.registerUser= async (req, res) => {
    const { error } = validateUserSignUp(req.body);
    if (error) {
        const errors = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return res.status(400).json({ errors });
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User ({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword,
            admin: false,
        })
        await user.save();

        return res.status(200).json({message: 'User registered successfully'});
    } catch (error) {
        if (error.code === 11000) {
            const { status, message } = handleDuplicateError(error);
            return res.status(status).json({ errors: message });
        } else {
            // Autres erreurs (génériques)
            return res.status(400).json({ errors: error.message });
        }
        }
}