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
    console.log(req.body.id)
    KELEY.findOne({_id: req.params.id}, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("Produit n'existe pas");return next(err);}
        else {
            res.render('produit', { title: 'keley-consulting', results : doc.produit });
        }
    })
}

exports.addProduit = function (req, res, next) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findOne({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
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
            doc.save(function(err){
                if (err) return next(err);
            })
        }
    })
}

exports.updateProduit = function (req, res, next) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var id = req.body.id;
    var nom = req.body.nom;
    var code = req.body.code;
    var description = req.body.description;
    var tarif = req.body.tarif;
    var poids = req.body.poids;

    KELEY.findByIdAndUpdate({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("catalogue n'existe pas");return next(err);}
        else {
            doc.produit.name         = name;
            doc.produit.code         = code;
            doc.produit.description  = description;
            doc.produit.tarif        = tarif;
            doc.produit.poids        = poids;
            doc.save(function(err){
                if (err) return next(err);
            })
        }
    })
}

exports.deleteProduit = function (req, res, next) {
    var nomCatalogue = req.body.nomCatalogue;
    var codeCatalogue = req.body.codeCatalogue;
    var idCatalogue = req.body.idCatalogue;
    var idProduit = req.body.idProduit;

    KELEY.findByIdAndUpdate({$or:[{'_id': req.body.id}, {'nom': nomCatalogue}, {'code': codeCatalogue}]}, function(err, doc){
        if (err) return next(err);
        else if (!doc) {console.log("catalogue n'existe pas");return next(err);}
        else {
            doc.nombre_produits = doc.nombre_produits - 1;
            doc.produit.id(idProduit).remove();
            doc.save(function(err){
                if (err) return next(err);
            })
        }
    })
}