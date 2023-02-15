const express = require('express');
const path = require('path');
const router = express.Router();
const html = 'text/html; charset=utf-8';
// show index page
router.get('/',(req, res)=>{
res.sendFile(path.join(__dirname,'../public','index.html'));
}); //현재 있는 곳이 라우터라서 상위폴더에 접근한것
// 단순한 그림파일
// 일일히 라우팅을 넣는게 아주 귀찮음
// router.get('/rubber-duck.png',(req, res)=>{
//      //응답으로 지정한 파일의 내용을 전송함
//     res.sendFile(path.join(__dirname,'../static/img','rubber-duck.png'));
// });
module.exports = router;