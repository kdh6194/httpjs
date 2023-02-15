const express = require('express');
const path = require('path');
const router = express.Router();
const html = 'text/html; charset=utf-8';
// show about page
router.get('/',(req, res)=>{
        res.sendFile(path.join(__dirname,'../public','about.html'));
});
module.exports = router;