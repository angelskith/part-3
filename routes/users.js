const express = require('express');
const router = express.Router();

const User = require('../models/User');


//Get all data display on table
router.get('/users', async(req, res) => {   
  try {
  await User.find({}, (err, users) => {
      if (err) throw err;
      // res.json(users) // output tru JSON
      res.render('users', { users: users }) // Output on the page
    })
  } catch (error) {

    return false
  }

});

router.get('/users/:id', async(req, res) => {   
  const id = req.params.id
  try {
  await User.find({}, (err, users) => {
      if (err) throw err;
      // res.json(users) // output tru JSON
      res.render('users', { users: users , id : id}) // Output on the page
    })
  } catch (error) {
    return false
  }
});

router.post('/delete/:id', async (req, res) => {
  let id = {_id: req.params.id }
  await User.findOneAndDelete(id)
   .then((user) => {
     res.redirect('/users')
   })
})



module.exports = router;
