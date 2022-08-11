const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
require('../db/db');
const UserValidation = require('../validation/UserValidation');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt;
const { verify } = require('jsonwebtoken');

const User = require('../models/User');
const Shared = require('../models/Shared');


router.get('/share/:id', async(req, res) => {
    const id = req.params.id
    await User.find({}, (err, users) => {
        if (err) throw err;
        Shared.find({}, (err, shares) => {
            if (err) throw err;
            res.render('share', { users: users, id: id, shares: shares })
        })
    })
})

router.post('/share/:id', async (req, res) => {
    const sharedFile = new Shared({
        fileId: mongoose.Types.ObjectId(req.body.fileId),
        sharedBy: req.body.example
    });
    sharedFile.save().then(() => {
        res.redirect('/share/:id');
    }).catch((err) => {
        res.status(500).send('Internal Server Error');
    })

    // make a condition to check on other user the sharedfiles
})

// Delete each data 
router.post('/remove/:id', async (req, res) => {
     await Shared.findByIdAndRemove(req.params.id)
      .then((share) => {
        res.redirect('/share/' + req.params.id)
      })
   })



module.exports = router;