
const {User , validateUserSignUp, validateUserSignIn} = require('../models/account.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

exports.loginUser = async (req, res) => {
    const { error } = validateUserSignIn(req.body);
    if (error) {
        const errors = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return res.status(400).json({ errors });
    }
    try {
        const user = await User.findOne({ login: req.body.login });
        if (!user) {
            return res.status(401).json({ errors: { invalidCredentials: 'Email ou mot de passe incorrect' } });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ errors: { invalidCredentials: 'Login ou mot de passe incorrect' } });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ errors: "Erreur interne : Clé JWT non configurée" });
        }
        const isLogged = true;
        const token=  jwt.sign(
            {Id: user._id, login: user.login, email: user.email, admin: user.admin},
            process.env.JWT_SECRET,
            { expiresIn: "1h" })
            res.setHeader('Authorization', 'Bearer ' + token);
            res.setHeader('X-User-Admin', user.admin);
            res.setHeader('X-User-Connected', isLogged ? true : false);

            return res.status(200).json({ message: 'User logged in successfully' });
          
            
    } catch (error) {
        return res.status(500).json({ errors: "Une erreur interne est survenue" });
    }
}

