const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const goodsRouter = require('./routes/goods');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // app에 cookieParser 미들웨어 등록
app.use(express.urlencoded({extended:true}));
app.use('/', indexRouter);
app.use('/', goodsRouter);

app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
});
