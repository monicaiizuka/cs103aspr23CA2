
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var AttractionSchema = Schema( {
  Destination: String,
  Duration: Number,
  Budget: Number,
  Type: String, 
  Surprise: Boolean,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'Attraction', AttractionSchema );
