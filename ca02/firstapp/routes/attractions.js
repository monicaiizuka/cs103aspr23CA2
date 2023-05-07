/*
  travel.js -- Router for the attractionsRouter
*/
const express = require('express');
const router = express.Router();
const Attraction = require('../models/Attraction')
const User = require('../models/User')

let prompt  

router.get('/attractions/', (req,res,next) => {
  res.render('attractionsList')
})

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* add the value in the body to the list associated to the key */
router.post('/attractions',
  isLoggedIn,
  async (req, res, next) => {
      console.log("we are inside the item for attraction")
      const attraction = new Attraction(
        {destination:req.body.destination,
         duration: req.body.duration,
         budget: req.body.budget,
         type: req.body.type,
         surprise: req.body.surprise,
         userId: req.user._id
        })
      await attraction.save();
      createPrompt(req);
      res.redirect('results?prompt='+prompt)
});

const createPrompt = (req) => {
  let type
  if (req.body.type) {
      type = "by " + req.body.type
  }else {
      type = ""
  }
  
  let surprise
  if (req.body.surprise) {
      surprise = " and put a random and surprise location."
  }else {
      surprise = ""
  }

  let budget
  if (req.body.budget) {
      budget = req.body.budget
  }else {
      budget = ""
  }
  
  let duration 
  if (req.body.duration) {
      duration =  req.body.duration
  }else {
      duration = ""
  }
  
  prompt = "Give me a full itinerary of " + type + " tourist attractions for a " + duration + " day trip with a budget of " + budget + " dollars in " + req.body.destination + " " + surprise + ".";
  console.log(prompt); 
}

module.exports = router;
