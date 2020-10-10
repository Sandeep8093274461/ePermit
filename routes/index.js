var express = require('express');
var router = express.Router();
var userBal = require('../models/BAL/userBal');

var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });
router.get('/signup', function (req, res, next) {
  res.render('user/signupPage', { applyNo: req.query.applyNo });
});
router.get('/loginShowpage', function (req, res, next) {
  res.render('user/loginShowpage');
});
router.get('/signupPageEdit', function (req, res, next) {
  res.render('user/signuppageedit');
});
router.get('/rejectedList', function (req, res, next) {
  res.render('user/rejectedList');
});


module.exports = router;