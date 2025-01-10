const Category = require('../models/category');
const Book = require('../models/book');

/**
 * Method used to get all categories
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find().limit(50);

        const books = await Book.find().populate('category');

        const categoriesWithCount = categories.map(category => {
            const booksCount = books.filter(book => book.category && book.category._id.toString() === category._id.toString()).length;
            return { ...category.toObject(), booksCount };
        });

        res.render('categories/index', { categories: categoriesWithCount, books });
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};


/**
 * Method used to get a category by its ID
 * @param req
 * @param res
 * @param next
 */
exports.getById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new Error('Category not found.');
        }

        const books = await Book.find({ category: category._id }).populate('category');

        res.render('categories/single', { category, books });
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to create a category
 * @param req
 * @param res
 * @param next
 */
exports.new = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            if (!req.body.name || !req.body.description) {
                throw new Error('Tous les champs sont obligatoires.');
            }

            const category = new Category({
                name: req.body.name,
                description: req.body.description,
            });
            await category.save();

            res.redirect('/categories');
        } catch (error) {
            console.error(error);
            res.redirect('/errors');
        }
    } else {
        res.render('categories/new', { action: '/categories/new', submitLabel: 'Créer' });
    }
};

/**
 * Method used to edit a category
 * @param req
 * @param res
 * @param next
 */
exports.edit = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            const { name, description } = req.body;

            const updateData = {
                name,
                description
            };

            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!updatedCategory) {
                throw new Error('Tâche non trouvée.');
            }

            res.redirect('/categories');
        } else {
            const category = await Category.findById(req.params.id);
            if (!category) {
                throw new Error('Tâche non trouvée.');
            }
            res.render('categories/edit', { category, action: `/categories/${category._id}/edit`, submitLabel: 'Mettre à jour' });
        }
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};

/**
 * Method used to delete a category by its ID
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            throw new Error('Category not found.');
        }
        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};