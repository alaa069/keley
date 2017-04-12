var KELEY = require('../models/catalogue').KELEY;

exports.index = function (req, res) {
    KELEY.find({},{},function(err, doc, next){
        if (err) return next(err);
        else if (!doc) console.log("catalogue n'existe pas")
        else {
            res.json(doc);
        }
    })
}

exports.addCatalogue = function (req, res, next) {
    KELEY.create(req.body, function (err, post) {
        if (err) {console.log(err);return next(err);}
        console.log(post)
        res.json(post);
    });
}

exports.updateCatalogue = function (req, res, next) {
    KELEY.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}

exports.deleteCatalogue = function (req, res, next) {
    KELEY.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}

exports.allProduit = function (req, res, next) {
    KELEY.findOne({_id: req.params.id}, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("Produit n'existe pas");return next(err);}
        else {
            res.json(doc.produit);
        }
    })
}

exports.addProduit = function (req, res, next) {
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findOne({'_id': req.params.id}, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("catalogue n'existe pas");return next(err);}
        else {
            doc.nombre_produits = doc.nombre_produits + 1;
            doc.produit.push({
                nom           : nom,
                code          : code,
                description   : description,
                tarif         : tarif,
                poids         : poids
            })
            doc.save(function(err,data){
                if (err) return next(err);
                res.json(data.produit[data.produit.length-1]);
            })
        }
    })
}

exports.updateProduit = function (req, res, next) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findById(req.params.id, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("catalogue n'existe pas");return next(err);}
        else {
            doc.produit.id(req.params.idp).nom         = nom;
            doc.produit.id(req.params.idp).code         = code;
            doc.produit.id(req.params.idp).description  = description;
            doc.produit.id(req.params.idp).tarif        = tarif;
            doc.produit.id(req.params.idp).poids        = poids;
            doc.save(function(err, data){
                if (err) return next(err);
                res.json(data);
            })
        }
    })
}

exports.deleteProduit = function (req, res, next) {

    KELEY.findById(req.params.id, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("catalogue n'existe pas");return next(err);}
        else {
            doc.nombre_produits = doc.nombre_produits - 1;
            doc.produit.id(req.params.idp).remove();
            doc.save(function(err, data){
                if (err) return next(err);
                res.json(data);
            })
        }
    })
}