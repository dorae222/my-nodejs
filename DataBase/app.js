const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});