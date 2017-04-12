var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// fichier de configuration
var config = require('../config/config')

// Connection au base de donné MongoDB
mongoose.connect(config.DataBase)
    .then(() =>  console.log('connection reussit'))
    .catch((err) => console.error(err));
//mongoose.set('debug', true);

// Tableau de produit
var produit = new Schema({
      nom          : { type: String, required: true}
    , code         : { type: String, required: true}
    , description  : { type: String }
    , tarif        : { type: Number, required: true}
    , poids        : { type: Number, required: true}
    , updated_at   : { type: Date, default: Date.now }
})

// Tableau de catalogue
var catalogue = new Schema({
      nom               : { type: String, required: true}
    , code              : { type: String, required: true}
    , nombre_produits   : { type: Number, default: 0 }
    , produit           : [produit]
    , updated_at        : { type: Date, default: Date.now }
})

var keley  = mongoose.model('keley', catalogue);

module.exports = {
  KELEY: keley
};