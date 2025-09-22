const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');

router.get('/', (req, res) => {

  // 문제 : Database에서 게시글 전체 목록을 날짜 내림차순으로 console창에 출력하세요
  const sql = 'select * from board order by indate desc';
  
  conn.query(sql, (err, rows) => {
    // console.log(rows);
    
    const boardData = {board:rows};

    res.render('index', boardData);
  });
});

router.get('/insert',(req,res) => {
  res.render('insert');
});

router.post('/insert',(req,res) => {
  // console.log(req.body); // { title: 'a', content: 'b', writer: 'c' }
  const {title, content, writer} = req.body;
  const sql = 'insert into board (title, content, writer) values (?, ?, ?)';
  conn.query(sql, [title, content, writer], (err, result) => {
    if (err) {
      console.error('데이터베이스 오류:', err);
    } else if (result && result.affectedRows > 0) {
      console.log('글쓰기 성공');
    } else {
      console.error('글쓰기 실패');
    }
    res.redirect('/');
  });
});

router.get('/content',(req,res)=>{
  // console.log(req.query); //{ idx: '7' }
  const idx = req.query.idx;
  const sql = 'select * from board where idx = ?'; // select: list형태로 가져옴
  conn.query(sql, idx, (err, rows) => {
    // console.log('rows',rows);
    res.render('content', rows[0]);
  });
  // 게시글 조회수 올리기
  const sql2 = 'update board set count = count+1 where idx = ?'
  conn.query(sql2, idx, (err, rows)=>{
    if (rows.affectedRows > 0){
      console.log('조회수 정상 +1');
    } else {
      console.log('조회수 +1 실패');
    }
  });

});

router.get('/delete',(req,res)=>{
  const idx = req.query.idx;
  const sql = 'delete from board where idx = ?';
  conn.query(sql, idx, (err, rows) => {
    if (rows.affectedRows > 0) {
      console.log('삭제 성공');
    } else {
      console.error('삭제 실패');
    }
    res.redirect('/');
  });
});

router.get('/update',(req,res)=>{
  const idx = req.query.idx;
  const sql = 'select * from board where idx = ?';
  conn.query(sql, idx, (err, rows) => {
    // console.log('rows',rows);
    res.render('update', rows[0]);
  });
});

router.post('/update',(req,res)=>{
  // console.log(req.body);
  const {idx, title, content, writer} = req.body;
  const sql = 'update board set title=?, content=?, writer=? where idx=?';
  conn.query(sql, [title, content, writer, idx], (err, rows) => {
    if (rows.affectedRows > 0) {
      console.log('수정 성공');
    } else {
      console.error('수정 실패');
    }
    res.redirect('/content?idx=' + idx);
  });
});

module.exports = router;