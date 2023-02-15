const express = require('express');
const app = express(); // const server = http.createServer() ->얘랑 같은 역할
const port = process.env.PORT || 3000;

const html = 'text/html; charset=utf-8';


// 라우팅 설정 : app.요청메서드(경로, 콜백함수)
app.get('/',(req, res)=>{
    res.type(html);
    res.end('<h1>index 페이지 입니다.</h1>')
});
app.get('/user',(req, res)=>{
    res.type(html);
    res.end('<h1>user 페이지 입니다.</h1>');
});

app.get('/about',(req, res)=>{
    res.type(html);
    res.end('<h1> 페이지 입니다.</h1>');
});
// routing path 추가분 - 파일이 복잡해짐
app.get('/user/add',(req, res)=>{
    res.type(html);
    res.end('<h1>user 가입 페이지 입니다.</h1>');
});

app.get('/user/view',(req, res)=>{
    res.type(html);
    res.end('<h1>user 상세정보 페이지 입니다.</h1>');
});
// custom 404 routing
// 라우팅 설정 2 : app.use(경로,콜백함수)
        //경로를 설정안하면 설정값외 나머지에서 출력하게끔
app.use((req, res)=>{
    res.type(html);
    res.status(404);
    res.end('<h1>404 - 페이지를 찾을 수 없습니다.</h1>');
});



app.listen(port,()=>{
    console.log('express 서버가 작동중... 중지하려면 ctrl+c를 누르세요.');
});