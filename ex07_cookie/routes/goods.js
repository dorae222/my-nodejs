const express = require('express');
const router = express.Router();

// 사용자별 장바구니 저장소 (실제 서비스에서는 데이터베이스 사용)
const userCarts = {};

router.get('/login', (req,res)=>{
    res.render('login');
});

router.post('/loginCheck', (req,res) => {
    // console.log(req.body);
    
    if(req.body.id == 'aischool' && req.body.pw == '1234'){
        // 로그인 성공
        // cookie는 key-value 형태로 전달
        res.cookie('nick','관리자');
        res.cookie('userId', req.body.id);
    } else if(req.body.id && req.body.pw) {
        // 다른 사용자들도 로그인 가능하도록
        res.cookie('nick', req.body.id);
        res.cookie('userId', req.body.id);
    }

    res.redirect('/');
});

router.get('/logout', (req,res) => {
    res.cookie('nick','', { maxAge:0 } );
    res.cookie('userId','', { maxAge:0 } );
    res.redirect('/');
});

router.get('/goodsList', (req,res) => {
    res.render('goodsList');
}); 

router.get('/goodsAdd', (req,res) => {
    const userId = req.cookies.userId;
    const goods = req.query.goods;
    
    if (!userId) {
        return res.send('로그인이 필요합니다.');
    }
    
    // 사용자별 장바구니 초기화
    if (!userCarts[userId]) {
        userCarts[userId] = [];
    }
    
    // 선택된 상품들을 사용자 장바구니에 추가
    if (goods) {
        if (Array.isArray(goods)) {
            userCarts[userId] = [...userCarts[userId], ...goods];
        } else {
            userCarts[userId].push(goods);
        }
    }
    
    console.log(`${userId}님의 장바구니:`, userCarts[userId]);
    console.log('전체 사용자 장바구니:', userCarts);
    
    res.send(`${userId}님, 담기 완료! 현재 장바구니: [${userCarts[userId].join(', ')}]`);
});

router.get('/cart', (req,res) => {
    const userId = req.cookies.userId;
    
    if (!userId) {
        return res.send('로그인이 필요합니다.');
    }
    
    const userCart = userCarts[userId] || [];
    res.send(`${userId}님의 장바구니: [${userCart.join(', ')}]`);
});

module.exports = router;