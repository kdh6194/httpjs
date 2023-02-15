const express = require('express');
const path = require('path');
const router = express.Router();
const html = 'text/html; charset=utf-8';
// show user page
router.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public','user.html'));
});
module.exports = router;