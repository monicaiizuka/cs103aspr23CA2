/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const Food = require('../models/FoodItem')
const User = require('../models/User')

let prompt
/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings
*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

// get the value associated to the key
router.get('/food/',
  isLoggedIn,
  async (req, res, next) => {
    res.render('foodList');               
});



/* add the value in the body to the list associated to the key */
router.post('/food',
  isLoggedIn,
  async (req, res, next) => {
      const todo = new FoodItem(
        {destination:req.body.destination,
         duration: req.body.duration,
         budget: req.body.budget,
         age21: req.body.age21,
         yum: req.body.yum,
         yuck: req.body.yuck,
         response: prompt,
         userId: req.user._id
        })
      await food.save();
      res.redirect('/food');
      //createPrompt(req);
      //res.redirect('results?prompt='+prompt)
    
      
});

  const createPrompt = (req) => {
    prompt = "Create an itinerary for where to eat on a " + req.body.duration + "day trip in " + req.body.destination;
    
    if(req.body.budget){
      prompt = prompt + "with a budget of " + req.body.budget
    }
    if(req.body.yum){
      prompt = prompt + ", being sure to include " + req.body.yum  + "."
    }
    if(req.body.yuck){
      prompt = prompt + " Exculde places that serve " + req.body.yuck + "." 
    }
    if(req.body.age21){
      prompt = prompt + " be sure to include local bars and wineries."
    }
    console.log(prompt);
    
  }




