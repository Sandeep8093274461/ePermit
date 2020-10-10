var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
  format = require('biguint-format'), sha256 = require('sha256');

var public = require('../models/BAL/publicBal');
module.exports = router;
function randomC(qty) {
  var x = crypto.randomBytes(qty);
  return format(x, 'dec');
}
function random(low, high) {
  return randomC(4) / Math.pow(2, 4 * 8 - 1) * (high - low) + low;
}
router.get('/login', function (req, res, next) {
  req.session.salt = random(50, 1000);
  res.render('public/loginPage', {sltstring: req.session.salt, error: ''});
});
router.post('/login',function(req,res,next)
{
  
  public.getUserDetails(req.body.username,function (response) {
      if(response.length == 0) {
        res.render('public/loginPage', {sltstring: req.session.salt, error: 'Wroing Creditional'});
      }
      else {
        let nPassword = sha256(response[0].password + req.session.salt);
        if(nPassword == req.body.password)
        {
          public.getUserDetailsByUserId(req.body.username,function(userDetails)
          {
            req.session.userId = response[0].userId;
            req.session.no = response[0].no;
            req.session.userName = userDetails[0].Name;
            switch (response[0].role) {
              case 'USER':{
                req.session.role = "USER";
                res.redirect('/user/chartPage');
                break;
              } 
              case 'ADMIN':{
                req.session.role = "ADMIN";
                res.redirect('/admin/approveLicenceForOneYear');
                break;
              } 
              case 'VA':{
                req.session.role = "VA";
                res.redirect('/va/verifyLicence');
                break;
              } 
              
            }
          })
          
        } 
        else {
          res.render('public/loginPage', {sltstring: req.session.salt, error: 'Wrong Creditional'});
        }
      }
     
 });
  
})
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})