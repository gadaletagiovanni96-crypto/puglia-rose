const mongoose = require('mongoose');
const passForMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    role: {
        type: String,
        enum: ['cliente', 'organizzatore', 'fornitore', 'scansionatore'],
        default: 'cliente'
    }
}, {timestamps: true});

userSchema.plugin(passForMongoose.default || passForMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);