const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');

const app = express();

// 템플릿엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우터 설정
// index 페이지 → localhost:3000/
app.use('/', indexRouter);

// products 페이지 → localhost:3000/products
app.use('/products', productRouter);

// 정적 리소스 경로(public) 설정
app.use(express.static(path.join(__dirname, 'public')));

// 서버 실행
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});