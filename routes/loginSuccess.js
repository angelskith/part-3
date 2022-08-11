const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const UserValidation = require('../validation/UserValidation');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt;

router.get('/', (req, res) => {

    const { token } = req.cookies;
    if (UserValidation.verifyToken(token)) {
        const getUser = jwt.verify(token, JWT_SECRET);
        res.render('loginSuccess', {activeUser : getUser.email});
    } else {
        res.redirect('/login');
    }
})

module.exports = router;