const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const Chat = require('../models/Chat');

router.get('/chats', async (req, res) => {
    try {
        await Chat.find({}, (err, chats) => {
            if (err) throw err;
            res.render('chats', { chats: chats })
        })
    } catch (error) {
        // console.log(error);
        return false
    }
})

//try to show the active users from cookie same logic at login

router.post('/chats', async (req, res) => {

    await Chat.create({
        msg: req.body.msg,
        date: Date() // how to show name of users
    }).then(chat => res.redirect('/chats'));
})

module.exports = router;