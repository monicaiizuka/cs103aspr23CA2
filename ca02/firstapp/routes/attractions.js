/*
  travel.js -- Router for the attractionsRouter
*/
const express = require('express');
const router = express.Router();
const Attraction = require('../models/Attraction')
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

// get the value associated to the key
router.get('/attractions/',
  isLoggedIn,
  async (req, res, next) => {
     res.render('attractionsList');
});

/* add the value in the body to the list associated to the key */
router.post('/attractions',
  isLoggedIn,
  async (req, res, next) => {
      const todo = new Attraction(
        {destination:req.body.destination,
         duration: req.body.duration,
         budget: req.body.budget,
         userId: req.user._id
        })
      await attractions.save();
      res.redirect('/attractions')
});


module.exports = router;
