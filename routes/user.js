const express = require('express');
const path = require('path');
const router = express.Router();

// show user page
router.get('/',(req, res)=>{
    // res.sendFile(path.join(__dirname,'../public','user.html'));
    res.render('user',{title:'user'});
});
module.exports = router;