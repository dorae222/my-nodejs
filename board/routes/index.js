const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');

router.get('/', (req, res) => {

  // 문제 : Database에서 게시글 전체 목록을 날짜 내림차순으로 console창에 출력하세요
  const sql = 'select * from board order by indate desc';
  
  conn.query(sql, (err, rows) => {
    console.log(rows);
    
    const boardData = {board:rows};

    res.render('index', boardData);
  });
});

module.exports = router;
