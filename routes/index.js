var express = require('express');
var router = express.Router();
// Require mySQL2
const mysql = require('mysql2');
//Require models
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Add get() route for actors
router.get('/actors', function(req, res, next) {
  models.actor
    .findAll({
// Use attributes property to filter actor columns
      attributes: ['actor_id', 'first_name', 'last_name'],
      include: [{
// Add attributes property to included models to filter models
        model: models.film,
        attributes: ['film_id', 'title', 'description', 'rental_rate', 'rating']
      }]
    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    });
});


module.exports = router;
