const express = require('express');
const path = require('path');
const router = express.Router();

// show about page
router.get('/',(req, res)=>{
        // res.sendFile(path.join(__dirname,'../public','about.html'));
        res.render('about',{title:'about'});
        // option 부분에 해당하는 정보는 따로 지정해야 적용되는듯
});
module.exports = router;