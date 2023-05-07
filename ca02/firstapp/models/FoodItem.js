'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var FoodItemSchema = Schema( {
  destination: String,
  duration: Number,
  budget: Number,
  age21: Boolean,
  yum: String,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'FoodItem', FoodItemSchema );
