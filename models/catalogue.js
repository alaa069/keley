var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Model = mongoose.Model;

  var produit = new Schema({
      nom : { type: String }
    , code   : { type: String }
    , nombre_produits    : { type: Number }
})