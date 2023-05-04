
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var AttractionsSchema = Schema( {
  Destination: String,
  Duration: Number,
  Budget: Number,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'Attractions', AttractionsSchema );
