/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');

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
        console.log("we are inside food item")
        const food = new FoodItem(
          {destination: req.body.destination,
              duration: req.body.weekend,
              budget: req.body.budget,
              age21: req.body.age21,
              yum: req.body.yum,
              userId: req.user._id
          })
        await food.save();
        createPrompt(req);

        res.redirect('results?prompt='+prompt)
});

const createPrompt = (req) =>{
    prompt = "Write an itinerary for a " + req.body.duration + " day trip to " + req.body.destination;
    if(req.body.budget){
        prompt = prompt + " with a budget of " + req.body.budget + ".";
    }
    if(req.body.yum){
        prompt = prompt + " Be sure to include places that serve " + req.body.yum;
    }
    if(req.body.age21){
      prompt = prompt + " as well as local bars and wineries.";
    }

    console.log(prompt);
}
  


module.exports = router;
