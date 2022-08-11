const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const UserValidation = require('../validation/UserValidation');
const ValidationException = require('../sharedData/ValidationException')
require('../db/db');
const salt = 10;

const User = require('../models/User');


router.get('/', (req, res, next) => {
  res.render('register');
})

//Add data to database
//I used express validator to validate the data
router.post('/',
  [check('fullName')
    .notEmpty().withMessage('Please enter your full name')
    .bail() // show errors one at a time
    .isLength({ min: 3, max: 30 }).withMessage('Full name must have min 3 and max 30 characters')
    ,
  check('email', 'Must be a valid e-mail address')
    .notEmpty().withMessage('Please enter your email address')
    .bail() // show errors one at a time
    .isEmail()
    .bail()
    .custom(async (email) => {
      const user = await UserValidation.findByEmail(email);
      if (user) {
        throw new Error('This email is already used');
      }
    })
    ,
  check('password')
    .notEmpty().withMessage('Please enter your password')
    .bail()
    .isLength({ min: 3, max: 30 }).withMessage('Weak password, Please enter atleast minimum of 3 characters')
    .custom(async (value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password confirmation is incorrect')
      }
    })
  ], async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()))
    }

    const {
      fullName,
      email,
      password: plainTextPassword,
      confirmPassword: plaintTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, salt);
    const confirmPassword = await bcrypt.hash(plainTextPassword, salt);

    await User.create({
      fullName,
      email,
      password,
      confirmPassword
    }).then(user => res.send(user));

  })



module.exports = router;