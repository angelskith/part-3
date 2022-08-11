const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/edit/:id', async(req, res) => {
    await User.findOne({_id : req.params.id})
    .then((user) => {
      res.render('edit', {user: user});
    })
}); 

router.post('/update/:id',(req, res) => {
    id = {_id :req.params.id};
    User.updateOne(id, {$set: {
      fullName: req.body.fullName,
      email: req.body.email
    }})
    .then(user => {
      res.redirect('/users');
    })
    .catch(err => {
      console.log(err);
    })
});



module.exports = router;