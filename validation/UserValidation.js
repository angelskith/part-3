const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('../db/db');
const User = require('../models/User');

const JWT_SECRET = process.env.jwt;

const findByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user;
}


const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            //  return next(new UserNotFoundException())
            return { status: 'error', error: 'User not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({_id: user._id, email: user.email, type: 'user' }, JWT_SECRET);
            return { status: 'ok', data: token };
        }
        //    return next(ValidationException({err: 'Invalid Password'}))
        return { status: 'error', error: 'invalid password' }
    } catch (error) {
        return { status: 'error', error: 'timed out' }
    }
}

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if(verify.type == 'user'){
            return true;
        }else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    findByEmail,
    authenticateUser,
    verifyToken
}