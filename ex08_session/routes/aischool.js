const express = require('express');
const router = express.Router();

router.get('/aiAddress', (req, res) => {
    // 사용자가 session이 없다면, session을 새로 생성
    // 사용자가 session이 있다면, 기존 session을 사용
    req.session.aiAddress = "광주광역시 동구 제봉로 92 인공지능사관학교";
    res.render('aiAddress', req.session);
});

router.get('/aiInfo', (req, res) => {
    req.session.aiInfo = {
        name : '인공지능사관학교',
        address : '광주광역시 동구 제봉로 92',
        price : '교육비 전액 무료',
        number : '6기'
    };
    res.render('aiInfo', req.session);
});

router.get('/aiList', (req, res) => {
    // 현재는 객체 배열이지만, 나중에는 DB로 대체
    const teacher = [
        { name : '김민수', nick : '유사 주우재', age : 20, hobby : '쇼핑하기'},
        { name : '최영화', nick : '자연재해', age : 21, hobby : '방탈출 하기'},
        { name : '조준용', nick : '초대형거인', age : 22, hobby : '아이들보기'},
        { name : '양하영', nick : '짱구', age : 23, hobby : '예쁜 카페 방문'},
        { name : '최황준', nick : '황진이', age : 24, hobby : '모르는 사람 만나기'},
        { name : '박병관', nick : '호두아빠', age : 25, hobby : '유트브 운영'}
    ];
    req.session.teacher = teacher;
    res.render('aiList', req.session);
});

module.exports = router;