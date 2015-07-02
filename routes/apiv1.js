var express = require('express');
var Firebase = require("firebase");
var _ = require("lodash");
var router = express.Router();
var fbRef = new Firebase(process.env.FB_URL);

router.get('/locations', function(req, res, next) {
  fbRef.once("value", function(snap) {
    res.json( { locations: snap.val() } );
  });
});

router.post("/locations", function(req, res, next) {
  var newLocation = _.pick(req.body, ['name', 'description', 'year']);
  if (newLocation.name) {
    fbRef.push(newLocation, function(err) {
      res.json(newLocation);
    });
  }
});

module.exports = router;
