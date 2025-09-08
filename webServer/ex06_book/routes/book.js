const express = require('express');
const router = express.Router();

// Sample book data (id, title, author) Database
// Must to be use identifier (id: 1,2,3...)
let books = [
    { id : 1 , title : 'Node.js - Guide Book' , author : 'Do1' },
    { id : 2 , title : 'Deep Learning - Guide Book' , author : 'Do2' }
];

// RESTful API design

// 1. Request whole data
// [GET]localhost:3000/books

// 2. Request single data
// [GET]localhost:3000/books?id=1 (Query String with Parameter)
// [GET]localhost:3000/books/1 (Path Variable)

// 3. Add data
// [POST]localhost:3000/books

// 4-1. Update whole data
// [PUT]localhost:3000/books/1(id)

// 4-2. Update partial data
// [PATCH]localhost:3000/books/1

// 5. Delete data
// [DELETE]localhost:3000/books/1(id)


// index page (list of books)
router.get('/books',(req, res)=>{
    // index.ejs rendering + books data
    //                  {key(variable name) : value(books array)}
    res.render('index', {books : books});
});

// add book
router.post('/books', (req, res)=>{
    // 1. get data from req.body ← app.js body-parser
    // req.body → return object type (extended: true)
    // First way
        // const title = req.body.title;
        // const author = req.body.author;
    // Second way
    const { title, author } = req.body;

    // add books object
    const newBook = { id : books.length + 1 , title : title , author : author };
    books.push(newBook);

    // index rendering + books array → /books(get)
    // redirect → get method
    res.redirect('/books');

});

// 책 상세 정보 보기
router.get('/books/:id', (req, res)=>{ // :id → URL path variable
    // :id → url 경로에 포함된 값 → req.params
    // req.query → Query String
    // req.body → POST method when data in body
    // req.params → URL Path Variable
    
    // books array에서 id와 일치하는 책 객체 찾기 → find() 메서드
    // 결과: 찾은 데이터 자체를 리턴 (책 객체
    const findBook = books.find((book) => book.id === req.params.id);
    
    // 책 정보 리턴(respones)
    // json(JS 객체) 형태 그대로 리턴(응답)
    res.json(findBook); // 데이터만 응답 (문자열, 숫자, 객체, ...)
});

module.exports = router;