const User = require('../models/User');

const register = async (req,res) => {
    try {
        const {email, password, role} = req.body;
        const newUser = new User({email, role});
        const registeredUser = await User.register(newUser, password);

        res.status(201).json({message: 'registrazione avvenuta con successo!', user: registeredUser});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const login = (req,res) => {
    res.status(200).json({
        message: 'Login effettuato!',
        user: req.user
    });
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({message: 'Logout effettuato con successo'});
    });
};

const getMe = (req,res) => {
    res.status(200).json({user: req.user});
}

module.exports = {register, login, logout, getMe};