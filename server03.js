const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const html = 'text/html; charset=utf-8';

// 지금하는건 선언형
// const fs = require('fs').promises 라고 작성했을때
    // 콘솔상에 문제는 없지만 웹서버가 동작하지는 않았음
    // (promises를 쓸때는 명령형으로 작성해야해서 충돌이 일어난듯)
//요청에 대한 정적파일을 서비스하는 함수
function serverStaticFile(res, fname) {
    fs.readFile(path.join(__dirname ,'public', fname),(err,data) => {
    // fs.readFile(__dirname + '/public/' + path,(err,data) => {  // path모듈없이 작성할때
        if(err){ // 파일을 읽다가 오류가 발생했다면
            // 응답코드 500 전송 후 오류메세지 출력
            res.writeHead(500,{'Content-Type':html})
            return res.end('<h1>파일처리중 오류발생</h1>')
        }
        res.writeHead(200,{'Content-Type':html})
        return res.end(data);
    })
}

// localhost:3000 요청시, 요청 path별 처리 세분화 - routing
// 요청 path : /
// 요청 path : /user
// 요청 path : /about
// 그외 나머지 : 404 - 페이지 없음

const server = http.createServer((req,res)=>{
        switch(req.url) {
            case '/':
                serverStaticFile(res, 'index.html');
                break;

            case '/user':
                serverStaticFile(res, 'user.html');
                break;

            case '/about':
                serverStaticFile(res, 'about.html');
                break;

            case '/500':
                serverStaticFile(res, '500.html');
                break;

            default:
                serverStaticFile(res, '404.html');
                break;
        }
});

server.listen(port, ()=>{
    console.log('서버가 작동중... 중지하려면 ctrl+c를 누르세요');
});