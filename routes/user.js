var express = require('express');
var router = express.Router();
var userBal = require('../models/BAL/userBal');
let path = require('path');
var multer = require('multer');
var permission = require("../models/permission");
module.exports = router;
router.get('/pagination', permission.permission("USER"), function (req, res, next) {
  res.render('user/pagination', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/chartPage', permission.permission("USER"), function (req, res, next) {
  res.render('user/chartPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/catagorypage', permission.permission("USER"), function (req, res, next) {
  res.render('user/catagorypage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo, dobValid: new Date(new Date().setFullYear(new Date().getFullYear() - 10)) });
});
router.get('/showCatagoryPage', permission.permission("USER"), function (req, res, next) {
  res.render('user/showCatagoryPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo, dobValid: new Date(new Date().setFullYear(new Date().getFullYear() - 10)) });
});
router.get('/register', permission.permission("USER"), function (req, res, next) {
  res.render('user/registerPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo, dobValid: new Date(new Date().setFullYear(new Date().getFullYear() - 10)) });
});
router.get('/registerforOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/registerforOneYear', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo, register: req.query.register, dobValid: new Date(new Date().setFullYear(new Date().getFullYear() - 10)) });
});

router.get('/loginShowpage', permission.permission("USER"), function (req, res, next) {
  res.render('user/loginShowpage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/pendingdataForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/pendingdataForOneYear', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/signupPageEdit', permission.permission("USER"), function (req, res, next) {
  res.render('user/signuppageedit', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/registerEditForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/registerEditForOneYear', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/rejectedListForLifeTime', permission.permission("USER"), function (req, res, next) {
  res.render('user/rejectedList', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/rejectedListForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/rejectedListForOneYear', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/approveLicencesForLifeTime', permission.permission("USER"), function (req, res, next) {
  res.render('user/approve', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/approveLicencesForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/approveLicencesForOneYear', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/trackApplicationForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/trackApplication', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/trackApplicationForLifeTime', permission.permission("USER"), function (req, res, next) {
  res.render('user/trackApplicationForLifeTime', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role });
});
router.get('/ilpCertificate', permission.permission("USER"), function (req, res, next) {
  res.render('user/ilpCertificate', { userId: req.session.userId, regNo: req.query.regNo, userName: req.session.userName, userRole: req.session.role });
});

router.get('/ilpCertificate', permission.permission("USER"), function (req, res, next) {
  res.render('user/ilpCertificate', { userId: req.session.userId, regNo: req.query.regNo, userName: req.session.userName, userRole: req.session.role });
});


router.get('/ilpCertificateForOneYear', permission.permission("USER"), function (req, res, next) {
  res.render('user/ilpCertificateForOneYear', { userId: req.session.userId, regNo: req.query.regNo, userName: req.session.userName, userRole: req.session.role });
});
router.get('/viewPage', permission.permission("USER"), function (req, res, next) {
  res.render('user/viewPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/viewRejectedPage', permission.permission("USER"), function (req, res, next) {
  res.render('user/viewRejectedPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/viewApprovePage', permission.permission("USER"), function (req, res, next) {
  res.render('user/viewApprovePage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});
router.get('/registerFinalPage', permission.permission("USER"), function (req, res, next) {
  res.render('user/registerFinalPage', { userId: req.session.userId, userName: req.session.userName, userRole: req.session.role, applyNo: req.query.applyNo });
});


router.get('/state', permission.permission("USER"), function (req, res, next) {
  userBal.getStates(function (response) {
    res.send(response);
  });
});
router.get('/getDistOfNagaland', permission.permission("USER"), function (req, res, next) {
  userBal.getDistrictOfNagaland(function (response) {
    res.send(response);
  });
});

router.get('/dist', function (req, res, next) {
  userBal.getDistricts(req.query.stateCode, function (response) {
    res.send(response);
  });
});
router.get('/block', function (req, res, next) {
  userBal.getBlocks(req.query.districtCode, function (response) {
    res.send(response);
  });
});
router.get('/villege', function (req, res, next) {
  userBal.getVilleges(req.query.blockCode, function (response) {
    res.send(response);
  });
});


router.post('/signup', permission.permission("USER"), function (req, res, next) {
  let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads/documents');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  let fileFilter = (req, file, callback) => {
    if (file.mimetype == 'application/pdf' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('File Format Should be PDF or Image'));
    }
  }
  var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([
    { name: 'userPhoto', maxCount: 1 },
    { name: 'nativeAddressProof', maxCount: 1 },
    { name: 'houseTax', maxCount: 1 },
    { name: 'landPatta', maxCount: 1 },
    { name: 'electroroll', maxCount: 1 },
    { name: 'electrorolltown', maxCount: 1 },
    { name: 'houserent', maxCount: 1 },
    { name: 'tradelicence', maxCount: 1 },
    { name: 'schoolrecords', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
    { name: 'electribill', maxCount: 1 },
    { name: 'telephonebill', maxCount: 1 },
    { name: 'bankpassbook', maxCount: 1 },
    { name: 'landtax', maxCount: 1 },
    { name: 'incomeTaxReturn', maxCount: 1 },
    { name: 'other', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 3 },
    { name: 'educationalCertificate', maxCount: 3 },
    { name: 'marriageCertificate', maxCount: 3 },
    { name: 'dimapurLivingProof', maxCount: 1 },
    { name: 'familyTreeSketch', maxCount: 1 },
    { name: 'filledAppForm', maxCount: 1 },
    { name: 'otherCertificate', maxCount: 3 },
    { name: 'govtPhotoId', maxCount: 1 }
  ]);
  upload(req, res, err => {
    if (err) throw err;
    let mdata = JSON.parse(req.body.Name1);

    if (req.files.userPhoto != undefined) {
      mdata.userPhotoUrl = req.files.userPhoto[0].path.replace('public', '../..');
    }
    if (req.files.nativeAddressProof != undefined) {
      mdata.nativeAddressProofUrl = req.files.nativeAddressProof[0].path.replace('public', '../..');
    }
    if (req.files.houseTax != undefined) {
      mdata.houseTaxUrl = req.files.houseTax[0].path.replace('public', '../..');
    }
    if (req.files.landPatta != undefined) {
      mdata.landPattaUrl = req.files.landPatta[0].path.replace('public', '../..');
    }
    if (req.files.electroroll != undefined) {
      mdata.electrorollUrl = req.files.electroroll[0].path.replace('public', '../..');
    }
    if (req.files.electrorolltown != undefined) {
      mdata.electrorolltownUrl = req.files.electrorolltown[0].path.replace('public', '../..');
    }
    if (req.files.houserent != undefined) {
      mdata.houserentUrl = req.files.houserent[0].path.replace('public', '../..');
    }
    if (req.files.tradelicence != undefined) {
      mdata.tradelicenceUrl = req.files.tradelicence[0].path.replace('public', '../..');
    }
    if (req.files.schoolrecords != undefined) {
      mdata.schoolrecordsUrl = req.files.schoolrecords[0].path.replace('public', '../..');
    }
    if (req.files.passport != undefined) {
      mdata.passportUrl = req.files.passport[0].path.replace('public', '../..');
    }
    if (req.files.electribill != undefined) {
      mdata.electribillUrl = req.files.electribill[0].path.replace('public', '../..');
    }
    if (req.files.telephonebill != undefined) {
      mdata.telephonebillUrl = req.files.telephonebill[0].path.replace('public', '../..');
    }
    if (req.files.bankpassbook != undefined) {
      mdata.bankpassbookUrl = req.files.bankpassbook[0].path.replace('public', '../..');
    }
    if (req.files.landtax != undefined) {
      mdata.landtaxUrl = req.files.landtax[0].path.replace('public', '../..');
    }
    if (req.files.incomeTaxReturn != undefined) {
      mdata.incomeTaxReturnUrl = req.files.incomeTaxReturn[0].path.replace('public', '../..');
    }
    if (req.files.other != undefined) {
      mdata.otherUrl = req.files.other[0].path.replace('public', '../..');
    }
    if (req.files.educationalCertificate != undefined) {
      mdata.educationalCertificateUrl = [];
      for (let i = 0; i < req.files.educationalCertificate.length; i++) {
        mdata.educationalCertificateUrl.push(req.files.educationalCertificate[i].path.replace('public', '../..'));
      }

    }
    if (req.files.birthCertificate != undefined) {
      mdata.birthCertificateUrl = [];
      for (let i = 0; i < req.files.birthCertificate.length; i++) {
        mdata.birthCertificateUrl.push(req.files.birthCertificate[i].path.replace('public', '../..'));
      }
    }

    if (req.files.marriageCertificate != undefined) {
      mdata.marriageCertificateUrl = [];
      for (let i = 0; i < req.files.marriageCertificate.length; i++) {
        mdata.marriageCertificateUrl.push(req.files.marriageCertificate[i].path.replace('public', '../..'));
      }
    }
    if (req.files.otherCertificate != undefined) {

      mdata.otherCertificateUrl = [];
      for (let i = 0; i < req.files.otherCertificate.length; i++) {
        mdata.otherCertificateUrl.push(req.files.otherCertificate[i].path.replace('public', '../..'));
      }
    }
    if (req.files.dimapurLivingProof != undefined) {
      mdata.dimapurLivingProofUrl = req.files.dimapurLivingProof[0].path.replace('public', '../..');
    }
    if (req.files.familyTreeSketch != undefined) {
      mdata.familyTreeSketchUrl = req.files.familyTreeSketch[0].path.replace('public', '../..');
    }
    if (req.files.filledAppForm != undefined) {
      mdata.filledAppFormUrl = req.files.filledAppForm[0].path.replace('public', '../..');
    }
    if (req.files.govtPhotoId != undefined) {
      mdata.govtPhotoIdUrl = req.files.govtPhotoId[0].path.replace('public', '../..');
    }
    userBal.signup(mdata, function (response) {
      res.send(response);
    });
  })
});

router.post('/signupForOneYear', permission.permission("USER"), function (req, res, next) {

  let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads/documents');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
  });
  let fileFilter = (req, file, callback) => {
    if (file.mimetype == 'application/pdf' || file.mimetype == 'application/PDF' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('File Format Should be PDF or Image'));
    }
  }


  var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([

    { name: 'userPhoto', maxCount: 1 },
    { name: 'nativeAddressProof', maxCount: 1 },
    { name: 'houseTax', maxCount: 1 },
    { name: 'electroroll', maxCount: 1 },
    { name: 'electrorolltown', maxCount: 1 },
    { name: 'houserent', maxCount: 1 },
    { name: 'tradelicence', maxCount: 1 },
    { name: 'schoolrecords', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
    { name: 'electribill', maxCount: 1 },
    { name: 'telephonebill', maxCount: 1 },
    { name: 'bankpassbook', maxCount: 1 },
    { name: 'landtax', maxCount: 1 },
    { name: 'incomeTaxReturn', maxCount: 1 },
    { name: 'other', maxCount: 1 },
    { name: 'proofOfRelationship', maxCount: 3 },
    { name: 'filledAppForm', maxCount: 1 },
    { name: 'govtPhotoId', maxCount: 1 }
  ]);

  upload(req, res, err => {
    if (err) throw err;
    let mdata = JSON.parse(req.body.Name1);

    if (req.files.userPhoto != undefined) {
      mdata.userPhotoUrl = req.files.userPhoto[0].path.replace('public', '../..');
    }
    if (req.files.nativeAddressProof != undefined) {
      mdata.nativeAddressProofUrl = req.files.nativeAddressProof[0].path.replace('public', '../..');
    }
    if (req.files.houseTax != undefined) {
      mdata.houseTaxUrl = req.files.houseTax[0].path.replace('public', '../..');
    }

    if (req.files.electroroll != undefined) {
      mdata.electrorollUrl = req.files.electroroll[0].path.replace('public', '../..');
    }
    if (req.files.electrorolltown != undefined) {
      mdata.electrorolltownUrl = req.files.electrorolltown[0].path.replace('public', '../..');
    }
    if (req.files.houserent != undefined) {
      mdata.houserentUrl = req.files.houserent[0].path.replace('public', '../..');
    }
    if (req.files.tradelicence != undefined) {
      mdata.tradelicenceUrl = req.files.tradelicence[0].path.replace('public', '../..');
    }
    if (req.files.schoolrecords != undefined) {
      mdata.schoolrecordsUrl = req.files.schoolrecords[0].path.replace('public', '../..');
    }
    if (req.files.passport != undefined) {
      mdata.passportUrl = req.files.passport[0].path.replace('public', '../..');
    }
    if (req.files.electribill != undefined) {
      mdata.electribillUrl = req.files.electribill[0].path.replace('public', '../..');
    }
    if (req.files.telephonebill != undefined) {
      mdata.telephonebillUrl = req.files.telephonebill[0].path.replace('public', '../..');
    }
    if (req.files.bankpassbook != undefined) {
      mdata.bankpassbookUrl = req.files.bankpassbook[0].path.replace('public', '../..');
    }
    if (req.files.landtax != undefined) {
      mdata.landtaxUrl = req.files.landtax[0].path.replace('public', '../..');
    }
    if (req.files.incomeTaxReturn != undefined) {
      mdata.incomeTaxReturnUrl = req.files.incomeTaxReturn[0].path.replace('public', '../..');
    }
    if (req.files.other != undefined) {
      mdata.otherUrl = req.files.other[0].path.replace('public', '../..');
    }
    if (req.files.proofOfRelationship != undefined) {
      mdata.proofOfRelationshipUrl = [];
      for (let i = 0; i < req.files.proofOfRelationship.length; i++) {
        mdata.proofOfRelationshipUrl.push(req.files.proofOfRelationship[i].path.replace('public', '../..'));
      }
    }
    if (req.files.filledAppForm != undefined) {
      mdata.filledAppFormUrl = req.files.filledAppForm[0].path.replace('public', '../..');
    }
    if (req.files.govtPhotoId != undefined) {
      mdata.govtPhotoIdUrl = req.files.govtPhotoId[0].path.replace('public', '../..');
    }

    userBal.signupForOneYear(mdata, function (response) {
      res.send(response);
    });
  });
});
router.post('/', function (req, res, next) {
  userBal.signup(req.body, function (response) {
    res.send(response);
  });
});

router.get('/getApplicationDetails', function (req, res, next) {
  userBal.getApplicationDetails(req.query.applyNo, function (response) {
    res.send(response);
  });

});
router.get('/alldataForLifeYear', function (req, res, next) {
  userBal.alldataForLifeYear(req.query.userId, (response) => {
    res.send(response);
  });

});
router.get('/allApprovedataForLifeYear', function (req, res, next) {
  userBal.allApprovedataForLifeYear(req.query.userId, (response) => {
    res.send(response);
  });

});
router.get('/allApprovedataForOneYear', function (req, res, next) {
  userBal.allApprovedataForOneYear(req.query.userId, (response) => {
    res.send(response);
  });

});
router.get('/alldataForOneYear', function (req, res, next) {
  userBal.alldataForOneYear(req.query.userId, (response) => {
    res.send(response);
  });

});
router.post('/update', function (req, res, next) {

  userBal.update(req.body.applyNo, req.body.updateData, function (response) {
    res.send(response);
  });

});
router.post('/reject', function (req, res, next) {
  var mdata = req.body[0];
  userBal.reject(mdata, function (response) {
    res.send(response);
  });

});
router.post('/verify', function (req, res, next) {
  var mdata = req.body[0];
  userBal.verify(mdata, function (response) {
    res.send(response);
  });

});
router.get('/getRejectedListForLifeTime', function (req, res, next) {
  userBal.getRejectedListForLifeTime(req.query.userId, (response) => {
    res.send(response);
  });

});

router.get('/getRejectedListForOneYear', function (req, res, next) {
  userBal.getRejectedListForOneYear(req.query.userId, (response) => {
    res.send(response);
  });

});

router.get('/allVeririfiedData', function (req, res, next) {
  userBal.allVeririfiedData(function (response) {
    res.send(response);
  });

});
router.post('/approveReject', function (req, res, next) {
  var mdata = req.body[0];
  userBal.approveReject(mdata, function (response) {
    res.send(response);
  });

});
router.post('/approved', function (req, res, next) {
  var mdata = req.body[0];
  userBal.approved(mdata, function (response) {
    res.send(response);
  });

});
router.get('/trackPageForOneYear', function (req, res, next) {
  userBal.trackPageForOneYear(req.query.userId, (response) => {
    res.send(response);
  });
});
router.get('/trackPageForLifeTime', function (req, res, next) {
  userBal.trackPageForLifeTime(req.query.userId, (response) => {
    res.send(response);
  });
});

router.get('/getApplicantDetail', (req, res) => {
  userBal.getApplicantDetail(req.query.regNo, (result) => {
    res.send(result);
  })
})
router.get('/allPendingData', (req, res) => {
  userBal.allPendingData(req.query.applyNo, (result) => {
    res.send(result);
  })
})

router.get('/allRejectedgData', (req, res) => {
  userBal.allRejectedgData(req.query.applyNo, (result) => {
    res.send(result);
  })
})


router.get('/getAllApprovedDataForLifeTime', function (req, res, next) {
  userBal.getAllApprovedDataForLifeTime(req.query.userId, (response) => {
    res.send(response);
  });
});
router.get('/getAllApprovedDataForOneYear', function (req, res, next) {
  userBal.getAllApprovedDataForOneYear(req.query.userId, (response) => {
    res.send(response);
  });
});
router.get('/getVaList', permission.permission("USER"), function (req, res, next) {
  userBal.getVaList(function (response) {
    res.send(response);
  });
});
router.get('/getApplicationMode', permission.permission('USER'), (req, res) => {
  userBal.getApplicationMode(result => {
    res.send(result);
  });
});
router.get('/getSubdivisionsOfDistrict', permission.permission('USER'), (req, res) => {
  userBal.getSubdivisionsOfDistrict(req.query.districtCode, result => {
    res.send(result);
  });
});

router.get('/validateToken', function (req, res, next) {
  userBal.validateToken(req.query.tokenNo, function (response) {
    res.send(response);

  });
});
router.get('/catagory', permission.permission("USER"), function (req, res, next) {
  userBal.getCatagory(function (response) {
    res.send(response);
  });
});
router.get('/getSubCatagories', function (req, res, next) {
  userBal.getSubCatagories(req.query.catagoryno, function (response) {
    res.send(response);
  });
});
router.get('/geturl', function (req, res, next) {
  userBal.geturl(req.query.subCatagoryno, function (response) {
    res.send(response);
  });
});
router.post('/submitdata', permission.permission("USER"), function (req, res, next) {
  var mdata = req.body;
  userBal.submitdata(mdata, function (response) {
    res.send(response);
  });
});
router.get('/getAllData', function (req, res, next) {
  userBal.getAllData(function (response) {
    res.send(response);
  });
});
router.get('/loadAllState', function (req, res, next) {
  userBal.loadAllState(function (response) {
    res.send(response);
  });
});
router.get('/loadAllReligion', function (req, res, next) {
  userBal.loadAllReligion(function (response) {
    res.send(response);
  });
});
router.get('/loadAllGender', function (req, res, next) {
  userBal.loadAllGender(function (response) {
    res.send(response);
  });
});
router.get('/loadGender', function (req, res, next) {
  userBal.loadGender(function (response) {
    res.send(response);
  });
});

// router.get('/geDataDummy', function (req, res, next) {
//   userBal.geDataDummy( function (response) {
//     res.send(response);
//   });
//  });