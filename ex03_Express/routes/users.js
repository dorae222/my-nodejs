const express = require('express');
const router = express.Router();

// localhost:3000/users/join
router.post('/join', (req, res) => {
  console.log(req.body); 
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  res.send('로그인 완료'); // 자동으로 2000k 코드 응답함, Content-Type도 자동으로 설정됨
});

module.exports = router;