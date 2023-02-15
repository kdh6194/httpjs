const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const aboutRouter = require('./routes/about')

const app = express();
const port = process.env.PORT || 3000;
const html = 'text/html; charset=utf-8';


// index에 대한 route handler 지정
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/about',aboutRouter);
// Router의 정체는 타고들어가게끔하는것
// 앞에 경로는 예를 들어 (http://localhost:3000/user) 였을때 동작하고
// Router 안에 있는 경로들은 /user 이후에 다시 쓰는 경로다
// http://localhost:3000/user/add에서 /add부분이 Router 안에 있는 경로인것이다
app.listen(port,()=>{
    console.log('express 서버가 작동중... 중지하려면 ctrl+c를 누르세요.');
});