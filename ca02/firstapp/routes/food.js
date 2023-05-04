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
    res.render('toDoList',{items,show,completed});               
});



/* add the value in the body to the list associated to the key */
router.post('/food',
  isLoggedIn,
  async (req, res, next) => {
      const todo = new ToDoItem(
        {item:req.body.item,
         createdAt: new Date(),
         completed: false,
         priority: parseInt(req.body.priority),
         userId: req.user._id
        })
      await todo.save();
      res.redirect('/food')
});

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
