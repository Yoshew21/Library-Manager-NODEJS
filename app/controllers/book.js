const Book = require('../models/book');
const Category = require('../models/category');

/**
 * Method used to get all books
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const books = await Book.find().limit(50).populate('category');
        const categories = await Category.find().limit(50);
        res.render('books/index', { books, categories, selectedCategory: null  });
    } catch (error) {
        console.error(error);
        return res.redirect('/errors');
    }
};

/**
 * Method used to get a book by its ID
 * @param req
 * @param res
 * @param next
 */
exports.getById = async (req, res, next) => {
    try {
        if (req.path.includes('new') || req.path.includes('edit')) {
            return next();
        }
        const book = await Book.findById(req.params.id).populate('category');
        const category = await Category.find().limit(50);
        if (!book) {
            throw new Error('Book not found.');
        }
        res.render('books/single', { book, category });
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to filter books by category
 * @param req
 * @param res
 * @param next
 */
exports.filterByCategory = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId; // Use query parameter instead of route parameter
        let books;
        if (categoryId) {
            books = await Book.find({ category: categoryId }).populate('category');
        } else {
            books = await Book.find().limit(50).populate('category'); // Show all books if no category is selected
        }
        const categories = await Category.find().limit(50);

        res.render('books/index', { books, categories, selectedCategory: categoryId || null });
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to create a book
 * @param req
 * @param res
 * @param next
 */
exports.new = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            if (!req.body.title || !req.body.author || !req.body.category) {
                throw new Error('All fields are required.');
            }
            const status = req.body.status === 'true';
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                status: status,
                category: req.body.category,
                imageUrl: req.body.imageUrl || '' // Add imageUrl
            });
            await book.save();
            res.redirect('/books');
        } catch (error) {
            console.error(error);
            res.redirect('/errors');
        }
    } else {
        try {
            const categories = await Category.find().limit(50);
            res.render('books/new', {
                action: '/books/new',
                submitLabel: 'Créer',
                categories: categories
            });
        } catch (error) {
            console.error(error);
            res.redirect('/errors');
        }
    }
};

/**
 * Method used to edit a book
 * @param req
 * @param res
 * @param next
 */
exports.edit = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            const { title, author, status, category, imageUrl } = req.body;
            const updateData = {
                title,
                author,
                status: status === 'true',
                category: category || null,
                imageUrl: imageUrl || '' // Add imageUrl
            };
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!updatedBook) {
                throw new Error('Book not found.');
            }
            res.redirect('/books');
        } else {
            const book = await Book.findById(req.params.id);
            if (!book) {
                throw new Error('Book not found.');
            }
            const categories = await Category.find().limit(50);
            res.render('books/edit', {
                book,
                categories,
                action: `/books/${book._id}/edit`,
                submitLabel: 'Mettre à jour'
            });
        }
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to change the status of a book
 * @param req
 * @param res
 * @param next
 */
exports.changeStatus = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            throw new Error('Book not found.');
        }

        book.status = !book.status;
        await book.save();

        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to delete a book by its ID
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            throw new Error('Book not found.');
        }
        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};
