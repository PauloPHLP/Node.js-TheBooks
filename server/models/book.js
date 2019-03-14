const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    stores: {
        type: [],
        default: null
    },
    pages: Number,
    price: Number
})

const Book = mongoose.model('Book', bookSchema);

module.exports = {Book};