var KELEY = require('../models/catalogue').KELEY;

exports.index = function (req, res) {
    KELEY.find({},{},function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            res.render('index', { title: 'keley-consulting', results : doc });
        }
    })
}

exports.addCatalogue = function (req, res) {
    var nom = req.body.nom;
    var code = req.body.code;

    var catalogue = new KELEY({
        nom: nom,
        code: code
    })

    catalogue.save(function(err){
        if (err) console.log(err)
    })
}

exports.updateCatalogue = function (req, res) {
    var nom = req.body.nom;
    var code = req.body.code;
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var id = req.body.id;

    KELEY.findByIdAndUpdate({$or:[{'_id': id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            doc.nom = nom;
            doc.code = code;
            
            doc.save(function(err){
                if (err) console.log(err)
            })
        }
    })
}

exports.deleteCatalogue = function (req, res) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var id = req.body.id;

    KELEY.findByIdAndRemove({$or:[{'_id': id}, {'nom': nomCatalogue}, {'code': codeCatalogue} ]}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            
        }
    })
}

exports.allProduit = function (req, res) {
    console.log(req.body.id)
    KELEY.findOne({_id: req.body.id}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("Produit n'existe pas")
        else {
            res.render('produit', { title: 'keley-consulting', results : doc.produit });
        }
    })
}

exports.addProduit = function (req, res) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findOne({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            doc.nombre_produits = doc.nombre_produits + 1;
            doc.produit.push({
                nom           : nom,
                code          : code,
                description   : description,
                tarif         : tarif,
                poids         : poids
            })
            doc.save(function(err){
                if (err) console.log(err)
            })
        }
    })
}

exports.updateProduit = function (req, res) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var id = req.body.id;
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findByIdAndUpdate({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            doc.produit.name         = name;
            doc.produit.code         = code;
            doc.produit.description  = description;
            doc.produit.tarif        = tarif;
            doc.produit.poids        = poids;
            doc.save(function(err){
                if (err) console.log(err)
            })
        }
    })
}

exports.deleteProduit = function (req, res) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var idCatalogue = req.body.idCatalogue;
    var idProduit = req.body.idProduit;

    KELEY.findByIdAndUpdate({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) console.log(err)
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            doc.nombre_produits = doc.nombre_produits - 1;
            doc.produit.id(idProduit).remove();
            doc.save(function(err){
                if (err) console.log(err)
            })
        }
    })
}