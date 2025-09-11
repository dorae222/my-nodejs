const express = require('express');
const router = express.Router();
const { destinations } = require('./travel');

// 메인 페이지 - 추천 여행지 목록
// GET localhost:3000/
router.get('/', (req, res) => {
    res.render('index', {
        title: '추천 여행지',
        destinations,
    });
});

module.exports = router;
