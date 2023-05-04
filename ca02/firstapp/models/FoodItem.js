'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var foodItemSchema = Schema( {
  destination: String,
  duration: Number,
  budget: Number,
  age21: Boolean,
  yum: String,
  yuck: String,
  response: String,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'FoodItem', foodItemSchema );
