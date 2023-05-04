'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var ArtItemSchema = Schema( {
  Destination: String,
  Duration: Number,
  Budget: Number,
  Type: String, 
  Genre: String,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'ArtItem', ArtItemSchema );
