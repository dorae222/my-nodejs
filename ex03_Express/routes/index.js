// 페이지 이동 기능 처리 라우터
const express = require('express');
const path = require('path');

const router = express.Router();

// localhost:3000/ => index.ejs
router.get('/', (req, res) => {
    // 템플릿 엔진(index.ejs) → html(.html) 문서로 최종 변환 → 렌더링
    const data = {user:{
        name:'<i>도형준</i>',
        isPremium : true},
        items : [
            {fruit : '사과', price: 1500},
            {fruit : '바나나', price: 3000},
            {fruit : '오렌지', price: 2000}
        ]
    };
    res.render('index', data);
});

router.get('/join', (req, res) => {
// join.html 응답
  res.sendFile(path.join(__dirname, '../','views', 'join.html'));
});

// localhost:3000/login => login.html
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../','views', 'login.html'));
});

module.exports = router;