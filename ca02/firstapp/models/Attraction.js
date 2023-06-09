
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var AttractionSchema = Schema( {
  destination: String,
  duration: Number,
  budget: Number,
  type: String, 
  surprise: String,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'Attraction', AttractionSchema );
