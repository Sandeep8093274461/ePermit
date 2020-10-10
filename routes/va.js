var express = require('express');
var router = express.Router();
var vaBal = require('../models/BAL/vaBal');
var permission = require('../models/permission');
module.exports = router;


router.get('/verifyLicence', permission.permission("VA"), function (req, res, next) {
  res.render('va/verifyLicence', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});
router.get('/verifyLicenceForOneYear', permission.permission("VA"), function (req, res, next) {
  res.render('va/verifyLicenceForOneYear', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});
router.get('/verifiedLicencesforLifeTime', permission.permission("VA"), function (req, res, next) {
  res.render('va/verifiedLicences', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});

router.get('/verifiedLicencesforOneYear', permission.permission("VA"), function (req, res, next) {
  res.render('va/verifiedLicencesforOneYear', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});
router.get('/viewPage',  permission.permission("VA"), function (req, res, next) {
  res.render('va/viewPage', {userId: req.session.userId, userName:req.session.userName,userRole:req.session.role, applyNo:req.query.applyNo});
});
router.get('/getVerifyLicenceForLifeTime', permission.permission("VA"), function (req, res, next) {
  vaBal.getVerifyLicenceForLifeTime(  req.query.userId, (response) => {
    res.send(response);
  });
});

router.get('/getVerifyLicenceForOneYear', permission.permission("VA"), function (req, res, next) {
  vaBal.getVerifyLicenceForOneYear( req.query.userId,function (response) {
    res.send(response);
  });
});

router.post('/reject', permission.permission("VA"), function (req, res, next) {
  vaBal.reject(req.body, function (response) {
    res.send(response);
  });
});

router.post('/verify', permission.permission("VA"), function (req, res, next) {
  vaBal.verify(req.body, function (response) {
    res.send(response);
  });
});
router.get('/getAllVerifiedDataForLifeTime', permission.permission("VA"), function (req, res, next) {
  vaBal.getAllVerifiedDataForLifeTime( req.query.userId, (response) => {
    res.send(response);
  });
});
router.get('/getAllVerifiedDataForOneYear', permission.permission("VA"), function (req, res, next) {
  vaBal.getAllVerifiedDataForOneYear( req.query.userId, (response) => {
    res.send(response);
  });
});
router.get('/allPendingData', (req, res) => {
  vaBal.allPendingData(req.query.applyNo, (result) => {
    res.send(result);
  })
})

router.get('/state', permission.permission("VA"), function (req, res, next) {
  vaBal.getStates(function (response) {
  res.send(response);
  });
 });

 router.get('/dist', function (req, res, next) {
  vaBal.getDistricts(req.query.stateCode, function (response) {
  res.send(response);
  });
 });
