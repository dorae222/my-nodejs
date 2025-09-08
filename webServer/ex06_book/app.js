const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// router
const bookRouter = require('./routes/book');

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended : true }));

// public path for static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// localhost:3000/
app.use('/', bookRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});