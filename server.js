// npm install express mongoose ejs serve-favicon nodemon dotenv
require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    path = require('path');

const main = async () => {
    const app = express();

    app.use(express.urlencoded({extended: true}));

    app.set('views', path.join(__dirname, 'app', 'views'));
    app.set('view engine', 'ejs');
    app.use(favicon(__dirname + '/public/library.ico'));

    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);

    require('./app/routes/books')(app);
    require('./app/routes/categories')(app);

    app.get('/errors', (req, res, next) => {
        return res.render('errors');
    });

    app.use((req, res, next) => {
        return res.redirect('/books');
    });

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
}

main();