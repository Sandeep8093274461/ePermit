var express = require('express');
var router = express.Router();
var adminBal = require('../models/BAL/adminBal');
var permission = require('../models/permission');
module.exports = router;


router.get('/approveLicenceForLifeTime', permission.permission("ADMIN"), function (req, res, next) {
  res.render('admin/approveLicence', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});

router.get('/approveLicenceForOneYear', permission.permission("ADMIN"), function (req, res, next) {
  res.render('admin/approveLicenceForOneYear', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});
router.get('/approvedLicencesForLifeTime', permission.permission("ADMIN"), function (req, res, next) {
  res.render('admin/approvedLicences', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});
router.get('/approvedLicencesForOneYear', permission.permission("ADMIN"), function (req, res, next) {
  res.render('admin/approvedLicencesForOneYear', { userId: req.session.userId,userName:req.session.userName,userRole:req.session.role });
});

router.get('/viewPage',  permission.permission("ADMIN"), function (req, res, next) {
  res.render('admin/viewPage', {userId: req.session.userId, userName:req.session.userName,userRole:req.session.role, applyNo:req.query.applyNo});
});

router.get('/getAllVeririfiedDataForLifeTime', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.getAllVeririfiedDataForLifeTime(function (response) {
    res.send(response);
  });
});
router.get('/getAllVeririfiedDataForOneYear', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.getAllVeririfiedDataForOneYear(function (response) {
    res.send(response);
  });
});
router.get('/getAllApprovedDataForLifeTime', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.getAllApprovedDataForLifeTime(function (response) {
    res.send(response);
  });
});
router.get('/getAllApprovedDataForOneYear', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.getAllApprovedDataForOneYear(function (response) {
    res.send(response);
  });
});

router.post('/rejectLicence', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.rejectLicence(req.body, function (response) {
    res.send(response);
  });
});

router.post('/approveLicence', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.approveLicence(req.body, function (response) {
    res.send(response);
  });
});

router.get('/allPendingData', (req, res) => {
  adminBal.allPendingData(req.query.applyNo, (result) => {
    res.send(result);
  })
})
router.get('/state', permission.permission("ADMIN"), function (req, res, next) {
  adminBal.getStates(function (response) {
  res.send(response);
  });
 });

 router.get('/dist', function (req, res, next) {
  adminBal.getDistricts(req.query.stateCode, function (response) {
  res.send(response);
  });
 });

