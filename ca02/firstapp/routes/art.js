/*
  art.js -- Router for the artRouter
*/
const express = require('express');
const router = express.Router();
const ArtItem = require('../models/ArtItem');
const User = require('../models/User');

let prompt

router.get('/art/', (req,res,next) => {
    res.render('artList')
})
  
router.post('/art',
    isLoggedIn,
    async (req, res, next) => {
        console.log("we are inside art item")
        const artItem = new ArtItem(
          {destination: req.body.destination,
              weekend: req.body.weekend,
              free: req.body.free,
              artist: req.body.artist,
              genre: req.body.genre,
              userId: req.user._id
          })
        await artItem.save();
        createPrompt(req);
        //res.header("prompt",prompt)
        res.redirect('results?prompt='+prompt)
});

const createPrompt = (req) => {
    let byArtist 
    if (req.body.artist) {
        byArtist = "by " + req.body.artist
    }else {
        byArtist = ""
    }
    
    let weekend
    if (req.body.weekend) {
        weekend = req.body.weekend
    }else {
        weekend = ""
    }

    let free
    if (req.body.free) {
        free = req.body.free
    }else {
        free = ""
    }
    
    let genre 
    if (req.body.genre) {
        genre =  req.body.genre
    }else {
        genre = ""
    }
    
    prompt = "what are the " + free + " museums that have " + genre + " art " + byArtist + " near " + req.body.destination + " " + weekend + "?";
    console.log(prompt); 
}

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}



module.exports = router;
