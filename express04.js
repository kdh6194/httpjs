const express = require('express');
const path = require('path');
const logger = require('morgan') // 로그 출력기
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser') // 폼 처리기 : 전송된 페이지에 보여주는 미들웨어

// 라우팅 외부 작성
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const aboutRouter = require('./routes/about')

const app = express();
const port = process.env.PORT || 3000;

// view 템플릿 엔진 설정
app.engine('hbs',engine({
    extname: '.hbs', defaultLayout: 'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    }
}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
// 파일명 engine이 아니라 view engine이라는 명령어이다
// 엔진이 정의하고 뷰엔진을 쓸때 가져오는 형식인듯

// 라우팅을 거치지않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));

// 로그 설정
app.use(logger('dev'));

// 미들웨어 등록 및 설정
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// 전송 폼 데이터에 대한 urlencoding을 위한 설정
app.use(bodyParser.json());  // 전송된 폼 데이터는 json형식으로 받음
//app.use(bodyParser.text()); // enctype이 text/plain일때 필요

// index에 대한 route handler 지정
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/about',aboutRouter);
// Router의 정체는 타고들어가게끔하는것
// 앞에 경로는 예를 들어 (http://localhost:3000/user) 였을때 동작하고
// Router 안에 있는 경로들은 /user 이후에 다시 쓰는 경로다
// http://localhost:3000/user/add에서 /add부분이 Router 안에 있는 경로인것이다

app.use((req, res)=>{
    res.status(404)
    res.sendFile(path.join(__dirname,'public','404.html'));
})
app.use((err,req, res,next)=>{
    console.log(err);
    res.status(500)
    res.sendFile(path.join(__dirname,'public','500.html'));
})
// 작동상태를 표시해 디버깅을 간단히 할 수 있다
app.listen(port,()=>{
    console.log('express 서버가 작동중... 중지하려면 ctrl+c를 누르세요.');
});
// 모종의 이유로 작업이 이상하게 끊겨서 실행을 하지 않는중에도
//  웹서버가 돌아간다면 작업하던창을 모두 종료하고 다시 실행하면 될지도