const express = require('express');
const router = express.Router();
const UserValidation = require('../validation/UserValidation');
require('../db/db');
var cookieParser = require('cookie-parser');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('login');
  });

  router.post('/', async (req,res) => {
    const { email, password } = req.body;
   
    const response = await UserValidation.authenticateUser(email,password)
    if(response.status ==='ok'){
        // JWT tokem as a cookie in browser
        res.cookie('token', token, { maxAge: 2*60*60*1000 , httpOnly: true })
        // res.redirect('dashboard', 'success login')
        res.redirect('/loginSuccess')
    }
    else {
        res.send(response);
    }
})


module.exports = router;