const express = require('express');
const router = express.Router();

// Sample book data (id, title, author) Database
// Must to be use identifier (id: 1,2,3...)
let books = [
    { id : 1 , title : 'Node.js - Guide Book' , author : 'Do1' },
    { id : 2 , title : 'Deep Learning - Guide Book' , author : 'Do2' }
];

let nextId = 3; // 다음 책이 가질 id 값

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

// 6. 수정 페이지 요청
// [GET]localhost:3000/form/1(id)

// index page (list of books)
router.get('/books',(req, res)=>{
    // index.ejs rendering + books data
    //                  {key(variable name) : value(books array)}
    res.render('index', {books : books});
});

// 책 추가하기
router.post('/books', (req, res)=>{
    // 1. get data from req.body ← app.js body-parser
    // req.body → return object type (extended: true)
    // First way
        // const title = req.body.title;
        // const author = req.body.author;
    // Second way
    const { title, author } = req.body;

    // add books object
    const newBook = { id : nextId++ , title : title , author : author };
    books.push(newBook); // push new book object to books array

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
    // 결과: 찾은 데이터 자체를 리턴 (책 객체)
    const findBook = books.find((book) => book.id == req.params.id);
    // 없는 id로 조회해서 차아올 책 정보가 없는 경우 → 404 Not Found
    if (!findBook) {
        res.status(404).json({ message: 'Book not found' });
        res.status(404).send('책을 찾을 수 없어요');
    }

    // 책 정보 리턴(respones)
    // json(JS 객체) 형태 그대로 리턴(응답)
    // res.send(findBook); // 데이터만 응답 (문자열, 숫자, 객체, ...)
    res.json(findBook); // json 형태로 응답 (200 OK)
});

// 수정 페이지 요청
router.get('/form/:id', (req,res)=>{
    // form.ejs 리턴 + 선택한 책 정보
    const book = books.find((book) => book.id == req.params.id);
    // book : 참조값(실제 배열의 해당 도서를 찾아갈 수 있음)
    res.render('form', { book }); // { book : book }과 같은 의미
});

// 책 정보 수정하기
router.put('/books/:id', (req,res)=>{
    // url →id
    // body → title, author
    const book = books.find((book) => book.id == req.params.id);
    // find → 찾아온 책(book → 실제 배열의 해당 책을 찾아갈 수 있는 참조값)

    // 배열의 특정 요소를 바디에 실어진 데이터로 수정
    book.title = req.body.title;
    book.author = req.body.author;

    // 요청 → 응답 필수
    // 수정 성공 메세지 응답
    res.json({ message : 'Update Success!' });
});


// 책 정보 삭제하기
router.delete('/books/:id', (req,res)=>{
    // 배열 안에서 특정 도서 객체 삭제
    // splice(시작인덱스, 몇개를 자를건지)
    // findIndex() : 찾고자 하는 요소가 몇 번 인덱스에 있는지 (인덱스 번호를 찾아줌)
    const idx = books.findIndex((book) => book.id == req.params.id);
    books.splice(idx, 1); // idx 위치에서 1개 자름 (삭제)

    // 삭제 성공 메세지 응답
    res.json({ message : 'Delete Success!' });
});

module.exports = router;