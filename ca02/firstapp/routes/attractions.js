/*
  travel.js -- Router for the attractionsRouter
*/
const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel')
const User = require('../models/User')

router.get('/travel', (req,res,next) => {
  res.render('travel')
})

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
