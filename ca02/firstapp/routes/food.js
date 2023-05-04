/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const Food = require('../models/FoodItem')
const User = require('../models/User')


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
         response: req.body.query,
         userId: req.user._id
        })
      await food.save();
      res.redirect('/food')
});
router.get('/food/generate-response', async (req, res) => {
  const prompt = req.query.prompt;
  const response = await getResponse(prompt);
  res.send(response);
});

async function getResponse(prompt) {
  const completion = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.8,
  });
  return completion.choices[0].text;
}
router.get('/todo/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /todo/remove/:itemId")
      await ToDoItem.deleteOne({_id:req.params.itemId});
      res.redirect('/toDo')
});

router.get('/todo/complete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /todo/complete/:itemId")
      await ToDoItem.findOneAndUpdate(
        {_id:req.params.itemId},
        {$set: {completed:true}} );
      res.redirect('/toDo')
});

router.get('/todo/uncomplete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /todo/complete/:itemId")
      await ToDoItem.findOneAndUpdate(
        {_id:req.params.itemId},
        {$set: {completed:false}} );
      res.redirect('/toDo')
});

router.get('/todo/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /todo/edit/:itemId")
      const item = 
       await ToDoItem.findById(req.params.itemId);
      //res.render('edit', { item });
      res.locals.item = item
      res.render('edit')
      //res.json(item)
});

router.post('/todo/updateTodoItem',
  isLoggedIn,
  async (req, res, next) => {
      const {itemId,item,priority} = req.body;
      console.log("inside /todo/complete/:itemId");
      await ToDoItem.findOneAndUpdate(
        {_id:itemId},
        {$set: {item,priority}} );
      res.redirect('/toDo')
});

router.get('/todo/byUser',
  isLoggedIn,
  async (req, res, next) => {
      let results =
            await ToDoItem.aggregate(
                [ 
                  {$group:{
                    _id:'$userId',
                    total:{$count:{}}
                    }},
                  {$sort:{total:-1}},              
                ])
              
        results = 
           await User.populate(results,
                   {path:'_id',
                   select:['username','age']})

        //res.json(results)
        res.render('summarizeByUser',{results})
});



module.exports = router;
