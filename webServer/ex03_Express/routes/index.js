// 페이지 이동 기능 처리 라우터
const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/join', (req, res) => {
// join.html 응답
  res.sendFile(path.join(__dirname, '../','views', 'join.html'));
});

// localhost:3000/login => login.html
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../','views', 'login.html'));
});

module.exports = router;