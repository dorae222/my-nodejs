//*라우터 객체 생성
const express = require('express');
const router = express.Router();
// 데이터베이스를 대신할 간단한 데이터 배열 (공유용)
const destinations = [
    { 
        id: 'paris', 
        name: '파리, 프랑스', 
        description: '예술과 낭만의 도시, 파리! 에펠탑과 루브르 박물관 등 세계적인 명소들이 여러분을 기다립니다. 맛있는 음식과 아름다운 거리를 거닐며 잊지 못할 추억을 만들어보세요.',
        image: '/images/paris.jpg' 
    },
    { 
        id: 'tokyo', 
        name: '도쿄, 일본', 
        description: '전통과 현대가 공존하는 매력적인 도시, 도쿄! 화려한 네온사인과 고요한 신사를 동시에 경험할 수 있습니다. 신선한 스시와 다양한 볼거리가 가득합니다.',
        image: '/images/tokyo.jpg' 
    },
    { 
        id: 'newyork', 
        name: '뉴욕, 미국', 
        description: '잠들지 않는 도시, 뉴욕! 타임스퀘어의 화려함, 센트럴파크의 여유, 그리고 브로드웨이의 멋진 공연까지. 세계 경제와 문화의 중심지에서 특별한 경험을 해보세요.',
        image: '/images/newyork.jpg' 
    }
];

// [GET] localhost:3000/destination?id=paris (상세 페이지)
// 주의: 라우트 경로에는 쿼리스트링을 포함하지 않습니다. '/destination' 만 작성합니다.
router.get('/destination', (req, res) => {
    // 쿼리스트링에서 id 값을 가져옴 (예: /destination?id=paris)
    const { id } = req.query;

    if (!id) {
        return res.status(400).send('Bad Request: id query is required');
    }

    // id 값과 일치하는 여행지 데이터를 찾음
    const destination = destinations.find(dest => dest.id === id);
    // 일치하는 데이터가 있으면 상세 페이지(destination) 렌더링 (해당 여행지 데이터를 포함할 것)
    if (destination) {
        res.render('destination', { destination });
    } else {
        res.status(404).send('Not Found');
    }
});
    
//*모듈 exports (라우터와 데이터 함께 내보내기)
module.exports = { router, destinations };