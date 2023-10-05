const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
});

export default model('users', userSchema);