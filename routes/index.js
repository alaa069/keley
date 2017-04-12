var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'keley-consulting' });
});

router.get('/produit/:id', function(req, res, next) {
  res.render('produit', { title: 'keley-consulting',idCat:req.params.id });
});

module.exports = router;
