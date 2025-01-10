const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    status: {
        type: Boolean,
        required: true,
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema, 'books');