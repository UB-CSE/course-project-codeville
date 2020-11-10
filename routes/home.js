const express = require('express');
const path = require('path');
const connection = require('../db');
const loggedin = require('../middleware/loggedin')

const router = express.Router();


router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

router.get('/personaldetails',loggedin, function (req, res, next) {
    res.render('personaldetails')
})
router.get('/education',loggedin, function (req, res, next) {
    res.render('education')
})

router.get('/home', loggedin, function(req,res,next){
    connection.query('select firstlogin from users where email = $1', [req.session.email], function (err, result) {
        if (err) {
            throw err;
        }
        if(result.rows[0].firstlogin){
            res.render('personaldetails')
        }
        else{
            res.send('HI')
        }
    });
})



module.exports = router;