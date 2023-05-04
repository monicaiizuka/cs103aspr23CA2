/*
  art.js -- Router for the artRouter
*/
const express = require('express');
const router = express.Router();
const Art = require('../models/ArtItem');
const User = require('../models/User');

router.get('/art', (req,res,next) => {
    res.render('art')
})
  
isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

module.exports = router;
