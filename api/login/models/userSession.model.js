const mongoose = require('mongoose');

let userSessionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: 'Email can\'t be empty',
        unique: false
    },
    transactionType: {
        type: String,
        required: 'Password can\'t be empty',
    },
    transactionDate: {
        type: Date,
        required: 'Transaction date can\'t be empty',
    }

});


mongoose.model('userSession', userSessionSchema);