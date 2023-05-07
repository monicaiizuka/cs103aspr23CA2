'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var ArtItemSchema = Schema( {
  destination: String,
  weekend: String,
  free: String,
  artist: String, 
  genre: String,
  userId: {type:ObjectId, ref:'user' }
} );

module.exports = mongoose.model( 'ArtItem', ArtItemSchema );
