const express = require('express');
const path = require('path');
const router = express.Router();

const SungJuk = require('../models/SungJuk')

const html = 'text/html; charset=utf-8';
// show index page
router.get('/',(req, res)=>{
// res.sendFile(path.join(__dirname,'../public','index.html')); 이렇게 적지말고
    // handledbars 뷰 엔진으로 응답처리

    res.render('index',{title:'index'});
});
//현재 있는 곳이 라우터라서 상위폴더에 접근한것

// 단순한 그림파일
// 일일히 라우팅을 넣는게 아주 귀찮음
// router.get('/rubber-duck.png',(req, res)=>{
//      //응답으로 지정한 파일의 내용을 전송함
//     res.sendFile(path.join(__dirname,'../static/img','rubber-duck.png'));
// });
router.get('/sungjuk',(req, res)=>{
    res.render('sungjuk',{title:'성적처리'});
});

router.get('/showsungjuk',async (req, res)=>{
   let sjs = new SungJuk().select().then(async result =>{
       return await result;
   });
    console.log(await sjs)
    res.render('showsungjuk',{title:'성적전체보기', sjs: await sjs});
});
    // 객체로 넘어간 값들은 #을 붙어야한다 (showsungjuk.hbs에서 범위를 지정할때)
router.post('/sungjuk',(req, res,next)=> {
    //폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인가능
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.kor);
    // console.log(req.body.eng);
    // console.log(req.body.mat);
    let {name, kor, eng, mat} = req.body;
    kor = parseInt(kor)
    eng = parseInt(eng)
    mat = parseInt(mat)
    //  [] 가 아닌 {} 를 사용해야한다 -> 전개 연산자
    console.log(name, kor, eng, mat);

    // 성적처리
    // 무식하게 일일히 지정하는것보단 미리 타입을 바꾸는 것이 훨씬 보기 좋다
    // grd 지정할 생각은 못했다 이건 완전 미스
    let [tot, avg, grd] = [kor +eng + mat, (kor + eng + mat) / 3, '가'];
        switch (avg) {
            case (avg = 100) :
            case (avg >= 90) : grd = '수';break;
            case (avg >= 80) : grd = '우';break;
            case (avg >= 70) : grd = '미';break;
            case (avg >= 60) : grd = '양';break;
        }
    console.log(tot, avg, grd);

    //------------------------------------

    new SungJuk(name, kor, eng, mat, tot, avg, grd).insert();
    // 변수명으로 지정한걸로 해야 실행이 된다.

    // let book = [];
    // if (name != ''){
    //     book.push(name, kor, eng, mat, tot, avg, grd);}
    // else{console.log('안됨');}
    // console.log(book)
    // push하는 과정 없이 그냥 값을 넣어도 된다
    // ex) let book = [name, kor, eng, mat, tot, avg, grd]
    // 위와같이 작성해도 실행이 된다
    // 모듈화 할때는 이렇게 해야겠지요?

        // async function main() {
        //
        //     // 이미실행하고 나서 다시 실행하려면 에러가 발생
        //     // 웹서버가 없어서 그렇게 진행하는것이 안된듯
        //     // 데이터베이스 처리 - sungjuk 테이블에 insert
        //     // db developer에 가서 tot,avg,grd를 추가해야함(alter구문 사용)
        //     // 아니면 테이블을 새로 생성하면 됨
        //
        //     let conn = null;
        //     let sql = 'insert into sungjuks (sjno,name,kor,eng,mat,tot,avg,grd)values (sjno.nextval,:1,:2,:3,:4,:5,:6,:7)'
        //     // sql변수명에 입력하는 구문은 sql에서 사용되는 구문들이 작동한다
        //
        // try {
        //         conn = await oracledb.makeConn()
        //     // await은 사용하려면 promise를 사용해야하는데
        //     //router.post('/sungjuk', async (req, res) ...
        //     //위와 같이 작성해도 promise가 적용이된다
        //     // 어제 분명히 gpt에 나왔는데도 못 보고 넘어갔네..
        //         let result = await conn.execute(sql, book)
        //         await conn.commit();
        //         console.log(result)
        // }catch
        //     (err)
        //     {
        //         console.log(err);
        //     }
        // finally
        //     {
        //       await oracledb.closeConn(conn)
        //     }
        //     } main();

    res.redirect(304,'/');
    }); // 여기다 post를 요청하면
module.exports = router;