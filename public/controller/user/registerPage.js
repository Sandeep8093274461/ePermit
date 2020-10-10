var app = angular.module("myApp", [])
app.controller("myCtr", function ($scope, $http, $filter) {
    $scope.applyNo = applyNo;

    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    $scope.showAck = false;
    $scope.showAppForm = true;
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.religion = "Hindu";
    $scope.ntitle = "Shri.";
    $scope.fatherTitle = "Shri.";
    $scope.material = "Married";
    $scope.birthCertificateList = [];
    $scope.educationalCertificateList = [];
    $scope.marriageCertificateList = [];
    $scope.otherCertificateList = [];
    // $scope.dobValid = new Date(dobValid);

    $http.get('http://localhost:1000/user/getApplicationMode')
        .then(response => {
            $scope.mode = response.data.mode;
        });
    $scope.validateToken = function () {
       if($scope.tokenNo != undefined){
        $http.get("http://localhost:1000/user/validateToken?tokenNo=" + $scope.tokenNo)
        .then(function (response) {
            if (response.data != "") {
                $scope.tokenno = true;
                $scope.userId = userId;
            }
            else {
                $scope.tokenno = false;
            }
        });
       }
       else{
        $scope.tokenno = false;
       }
           
       
    }
    $scope.loadStates = function () {
        $http.get("http://localhost:1000/user/state")
            .then(function (response) {
                $scope.states = response.data;
            });
    }
    $scope.loadVa = function () {
        $http.get("http://localhost:1000/user/getVaList")
            .then(function (response) {
                $scope.vaList = response.data;
            });
    }
    $scope.loadPsDistricts = function () {
        $http.get("http://localhost:1000/user/getDistOfNagaland")
            .then(function (response) {
                $scope.psdistricts = response.data;
            });
    }
    $scope.addCertificate = (fileName) => {
        let file = document.getElementById(fileName).files[0];
        if (file != undefined) {
            switch (fileName) {
                case 'birthCertificate': {
                    $scope.birthCertificateList.push(file);
                    document.getElementById(fileName).value = null;
                    break;
                }
                case 'educationalCertificate': {
                    $scope.educationalCertificateList.push(file);
                    document.getElementById(fileName).value = null;
                    break;
                }
                case 'marriageCertificate': {
                    $scope.marriageCertificateList.push(file);
                    document.getElementById(fileName).value = null;
                    break;
                }
                case 'otherCertificate': {
                    $scope.otherCertificateList.push(file);
                    document.getElementById(fileName).value = null;
                    break;
                }
            }
        } else {
            window.alert('First select file.');
        }
    }
    $scope.removeCertificate = (fileName, index) => {
        switch (fileName) {
            case 'birthCertificate': {
                $scope.birthCertificateList.splice(index);
                break;
            }
            case 'educationalCertificate': {
                $scope.educationalCertificateList.splice(index);
                break;
            }
            case 'marriageCertificate': {
                $scope.marriageCertificateList.splice(index);
                break;
            }
            case 'otherCertificate': {
                $scope.otherCertificateList.splice(index);
                break;
            }
        }
    }

    $scope.edit = function () {
        if ($scope.applyNo != '') {

            $http.get("http://localhost:1000/user/getApplicationDetails?applyNo=" + $scope.applyNo)
                .then(function (response) {
                    $scope.details = response.data[0];
                    $scope.tokenNo = $scope.details.tokenNo;
                    $scope.ntitle = $scope.details.nametitle;
                    $scope.name = $scope.details.name;
                    $scope.fatherTitle = $scope.details.fatherTitle;
                    $scope.fathername = $scope.details.fatherName;
                    $scope.dob = new Date($scope.details.dob);
                    $scope.gender = $scope.details.gender;
                    $scope.mark = $scope.details.mark;

                    $scope.contactno = $scope.details.contactno;
                    $scope.addahar = $scope.details.addahar;
                    $scope.material = $scope.details.material;
                    $scope.spousename = $scope.details.spouse;
                    $scope.husband_spousetitle = $scope.details.spousetitle;
                    $scope.husband_spouse = $scope.details.spouse;
                    $scope.husband_spousefathertitle = $scope.details.husband_spousefathertitle;
                    $scope.husband_spousename = $scope.details.husband_spousename;
                    $scope.presentAddress = {};

                    $scope.pspostoffice = $scope.details.presentAddress.postOffice;
                    $scope.pspolicestation = $scope.details.presentAddress.policeStation;
                    $scope.psvillege = $scope.details.presentAddress.villege;

                    $scope.pslandmark = $scope.details.presentAddress.nearby;
                    $scope.psplotno = $scope.details.presentAddress.plotno;
                    $scope.psblock_lane = $scope.details.presentAddress.block_lane;
                    $scope.pscolony = $scope.details.presentAddress.colony;
                    $scope.pspincode = $scope.details.presentAddress.pincode;

                    $scope.permanentAddress = {};
                    $scope.prvillege = $scope.details.permanentAddress.villege;
                    $scope.prpolicestation = $scope.details.permanentAddress.policeStation;

                    $scope.prpostoffice = $scope.details.permanentAddress.postOffice;
                    $scope.prlandmark = $scope.details.permanentAddress.nearby;
                    $scope.prplotno = $scope.details.permanentAddress.plotno;
                    $scope.prblock_lane = $scope.details.permanentAddress.block_lane;
                    $scope.prcolony = $scope.details.permanentAddress.colony;
                    $scope.prpincode = $scope.details.permanentAddress.pincode;
                    $scope.prsubdivision = $scope.details.permanentAddress.subdivision;

                    $scope.occupication = $scope.details.occupication;
                    $scope.religion = $scope.details.religion;
                    $scope.community = $scope.details.community;
                    $scope.doresiding = new Date($scope.details.Residing);
                    $scope.relation = $scope.details.relation;
                    $scope.primary_applicanttiltle = $scope.details.nameOfPrimaryApplicantTittle;
                    $scope.primary_applicant = $scope.details.nameOfPrimaryApplicant;
                    $scope.otherDocuments = $scope.details.otherDocuments;
                    $scope.reasonAboveDocuments = $scope.details.reasonAboveDocuments;
                    $scope.otherCertificateName = $scope.details.otherCertificateName;

                    $scope.showUserPhotoError = true;
                    $scope.userPhotoFileGood = "UPLOADED";


                    if ($scope.details.houseTaxUrl != undefined) {
                        $scope.showHouseTaxError = true;
                        $scope.houseTaxFileGood = "UPLOADED";
                        $scope.houseTax = true;
                    }
                    if ($scope.details.landPattaUrl != undefined) {
                        $scope.showLandPattaError = true;
                        $scope.landPattaFileGood = "UPLOADED";
                        $scope.landPatta = true;
                    }
                    if ($scope.details.electrorollUrl != undefined) {
                        $scope.showelEctroRollError = true;
                        $scope.electroRollFileGood = "UPLOADED";
                        $scope.electroroll = true;
                    }
                    if ($scope.details.electrorolltownUrl != undefined) {
                        $scope.showElectroRollTownError = true;
                        $scope.electroRollTownFileGood = "UPLOADED";
                        $scope.electrorolltown = true;
                    }
                    if ($scope.details.houserent != undefined) {
                        $scope.showHouseRentError = true;
                        $scope.houseRentFileGood = "UPLOADED";
                        $scope.houserent = true;
                    }
                    if ($scope.details.telephonebillUrl != undefined) {
                        $scope.showTelephoneBillError = true;
                        $scope.telephoneBillFileGood = "UPLOADED";
                        $scope.telephonebill = true;
                    }
                    if ($scope.details.bankpassbookUrl != undefined) {
                        $scope.showBankPassbookError = true;
                        $scope.bankPassbookFileGood = "UPLOADED";
                        $scope.bankpassbook = true;
                    }
                    if ($scope.details.birthCertificateUrl != undefined) {
                        $scope.showBirthCertificateError = true;
                        $scope.birthCertificateFileGood = "UPLOADED";
                        $scope.birthCertificate = true;
                    }
                    if ($scope.details.educationalCertificateUrl != undefined) {
                        $scope.showEducationalCertificateError = true;
                        $scope.educationalCertificateFileGood = "UPLOADED";
                        $scope.educationalCertificate = true;
                    }
                    if ($scope.details.marriageCertificateUrl != undefined) {
                        $scope.showMarriageCertificateError = true;
                        $scope.marriageCertificateFileGood = "UPLOADED";
                        $scope.marriageCertificate = true;
                    }
                    if ($scope.details.otherCertificateUrl != undefined) {
                        $scope.showOtherCertificateError = true;
                        $scope.otherCertificateFileGood = "UPLOADED";
                        $scope.otherCertificate = true;
                    }
                    if ($scope.details.houserentUrl != undefined) {
                        $scope.showHouseRentError = true;
                        $scope.houseRentFileGood = "UPLOADED";
                        $scope.houserent = true;
                    }
                    if ($scope.details.tradelicenceUrl != undefined) {
                        $scope.showTradeLicenceError = true;
                        $scope.tradeLicenceFileGood = "UPLOADED";
                        $scope.tradelicence = true;
                    }
                    if ($scope.details.schoolrecordsUrl != undefined) {
                        $scope.showSchoolRecordsError = true;
                        $scope.schoolRecordsFileGood = "UPLOADED";
                        $scope.schoolrecords = true;
                    }
                    if ($scope.details.passportUrl != undefined) {
                        $scope.showPassportError = true;
                        $scope.passportFileGood = "UPLOADED";
                        $scope.passport = true;
                    }
                    if ($scope.details.electribillUrl != undefined) {
                        $scope.showElectriBillError = true;
                        $scope.electriBillFileGood = "UPLOADED";
                        $scope.electribill = true;
                    }
                    if ($scope.details.telephonebillUrl != undefined) {
                        $scope.showTelephoneBillError = true;
                        $scope.telephoneBillFileGood = "UPLOADED";
                        $scope.telephonebill = true;
                    }
                    if ($scope.details.bankpassbookUrl != undefined) {
                        $scope.showBankPassbookError = true;
                        $scope.bankPassbookFileGood = "UPLOADED";
                        $scope.bankpassbook = true;
                    }
                    if ($scope.details.landtaxUrl != undefined) {
                        $scope.showLandTaxError = true;
                        $scope.landTaxFileGood = "UPLOADED";
                        $scope.landtax = true;
                    }
                    if ($scope.details.incomeTaxReturnUrl != undefined) {
                        $scope.showIncomeTaxrError = true;
                        $scope.incomeTaxFileGood = "UPLOADED";
                        $scope.incomeTaxReturn = true;
                    }
                    if ($scope.details.otherUrl != undefined) {
                        $scope.showOtherError = true;
                        $scope.otherFileGood = "UPLOADED";
                        $scope.other = true;
                    }
                    if ($scope.details.dimapurLivingProofUrl != undefined) {
                        $scope.showDimapurLivingProofError = true;
                        $scope.dimapurLivingProofFileGood = "UPLOADED";
                        $scope.dimapurLivingProof = true;
                    }
                    if ($scope.details.familyTreeSketchUrl != undefined) {
                        $scope.showFamilyTreeSketchError = true;
                        $scope.familyTreeSketchFileGood = "UPLOADED";
                        $scope.familyTreeSketch = true;
                    }
                    if ($scope.details.filledAppFormUrl != undefined) {
                        $scope.showFilledAppFormError = true;
                        $scope.filledAppFormFileGood = "UPLOADED";
                        $scope.filledAppForm = true;
                    }
                    if ($scope.details.nativeAddressProofUrl != undefined) {
                        $scope.showNativeAddressProofError = true;
                        $scope.nativeAddressProofFileGood = "UPLOADED";
                        $scope.nativeAddressProof = true;
                    }
                    if ($scope.details.govtPhotoIdUrl != undefined) {
                        $scope.showgovtPhotoIdError = true;
                        $scope.filledGovtPhotoIdGood = "UPLOADED";
                        $scope.govtPhotoId = true;
                    }



                    $http.get("http://localhost:1000/user/state")
                        .then(function (response) {
                            $scope.states = response.data;

                            $scope.prstate = $scope.states[$scope.states.findIndex(x => x.stateCode == $scope.details.permanentAddress.state.stateCode)];

                            $http.get("http://localhost:1000/user/dist?stateCode=" + $scope.prstate.stateCode)
                                .then(function (response) {
                                    $scope.prdistricts = response.data;
                                    $scope.prdistrict = $scope.prdistricts[$scope.prdistricts.findIndex(x => x.districtCode == $scope.details.permanentAddress.dist.districtCode)];
                                });
                            $http.get("http://localhost:1000/user/getDistOfNagaland")
                                .then(function (response) {
                                    $scope.psdistricts = response.data;
                                    $scope.psdistrict = $scope.psdistricts[$scope.psdistricts.findIndex(x => x.districtCode == $scope.details.presentAddress.dist.districtCode)];
                                    $http.get("http://localhost:1000/user/getSubdivisionsOfDistrict?districtCode=" + $scope.psdistrict.districtCode)
                                        .then(function (response) {
                                            $scope.psSubdivList = response.data;
                                            $scope.pssubdivision = $scope.psSubdivList[$scope.psSubdivList.findIndex(x => x.subdivCode == $scope.details.presentAddress.subdivision.subdivCode)];
                                        });
                                });

                            $http.get("http://localhost:1000/user/getVaList")
                                .then(function (response) {
                                    $scope.vaList = response.data;
                                    $scope.va = $scope.vaList[$scope.vaList.findIndex(x => x.UserId == $scope.details.forwardedTo)];
                                });

                        });
                });
        } else {
            $scope.loadStates();
            $scope.loadPsDistricts();
            $scope.loadVa();
        }
    }
    $scope.edit();

    $scope.preview = () => {
        let govtPhotoId = document.querySelector('#govtPhotoId').files[0];
        let filledAppForm = document.querySelector('#filledAppForm').files[0];
        let nativeAddressProof = document.querySelector('#nativeAddressProof').files[0];
        let userPhoto = document.querySelector('#userPhoto').files[0];
        if (filledAppForm != undefined && nativeAddressProof != undefined && govtPhotoId != undefined && familyTreeSketch != undefined && dimapurLivingProof != undefined && userPhoto != undefined) {
            $scope.showAck = true;
            $scope.showAppForm = false;

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        // var userPhoto1 = document.querySelector('#userPhoto').files[0];
    }
    $scope.back = () => {
        $scope.showAck = false;
        $scope.showAppForm = true;
    }
    $scope.submit = function () {
        let govtPhotoId = document.querySelector('#govtPhotoId').files[0];
        let filledAppForm = document.querySelector('#filledAppForm').files[0];
        let nativeAddressProof = document.querySelector('#nativeAddressProof').files[0];
        let userPhoto = document.querySelector('#userPhoto').files[0];
        if (filledAppForm != undefined && nativeAddressProof != undefined && govtPhotoId != undefined && familyTreeSketch != undefined && dimapurLivingProof != undefined && userPhoto != undefined) {
            $scope.data1 = [];
            $scope.data = {};
            
            $scope.data.userId = userId;
            $scope.data.tokenNo = $scope.tokenNo;
            $scope.data.nametitle = $scope.ntitle;
            $scope.data.name = $scope.name;
            $scope.data.fatherTitle = $scope.fatherTitle;
            $scope.data.fatherName = $scope.fathername;
            $scope.data.dob = $scope.dob;
            $scope.data.gender = $scope.gender;
            $scope.data.mark = $scope.mark;
            $scope.data.contactno = $scope.contactno;
            $scope.data.addahar = $scope.addahar;
            $scope.data.material = $scope.material;
            if ($scope.material == 'Married') {
                $scope.data.spousetitle = $scope.husband_spousetitle;
                $scope.data.spouse = $scope.husband_spouse;

                $scope.data.husband_spousefathertitle = $scope.husband_spousefathertitle;
                $scope.data.husband_spousename = $scope.husband_spousename;
            }
            $scope.data.presentAddress = {};
            $scope.data.presentAddress.state = $scope.psstate;
            $scope.data.presentAddress.dist = $scope.psdistrict;
            $scope.data.presentAddress.subdivision = $scope.pssubdivision;
            $scope.data.presentAddress.policeStation = $scope.pspolicestation;
            $scope.data.presentAddress.postOffice = $scope.pspostoffice;
            $scope.data.presentAddress.nearby = $scope.pslandmark;
            $scope.data.presentAddress.plotno = $scope.psplotno;
            $scope.data.presentAddress.block_lane = $scope.psblock_lane;
            $scope.data.presentAddress.colony = $scope.pscolony;
            $scope.data.presentAddress.villege = $scope.psvillege;
            $scope.data.presentAddress.pincode = $scope.pspincode;


            $scope.data.permanentAddress = {};
            $scope.data.permanentAddress.state = $scope.prstate;
            $scope.data.permanentAddress.dist = $scope.prdistrict;
            $scope.data.permanentAddress.subdivision = $scope.prsubdivision;
            $scope.data.permanentAddress.policeStation = $scope.prpolicestation;
            $scope.data.permanentAddress.postOffice = $scope.prpostoffice;
            $scope.data.permanentAddress.nearby = $scope.prlandmark;
            $scope.data.permanentAddress.plotno = $scope.prplotno;
            $scope.data.permanentAddress.block_lane = $scope.prblock_lane;
            $scope.data.permanentAddress.colony = $scope.prcolony;
            $scope.data.permanentAddress.villege = $scope.prvillege;
            $scope.data.permanentAddress.pincode = $scope.prpincode;

            $scope.data.occupication = $scope.occupication;
            $scope.data.religion = $scope.religion;
            $scope.data.Residing = $scope.doresiding;
            $scope.data.otherCertificateName = $scope.otherCertificateName;
            $scope.data.relation = $scope.relation;
            $scope.data.nameOfPrimaryApplicantTittle = $scope.primary_applicanttiltle;
            $scope.data.nameOfPrimaryApplicant = $scope.primary_applicant;

            $scope.data.reasonAboveDocuments = $scope.reasonAboveDocuments;
            $scope.data.otherDocuments = $scope.otherDocuments;

            $scope.data.forwardedTo = $scope.va.UserId;
            var data = new FormData();
            var request = new XMLHttpRequest();

            data.append('userPhoto', document.querySelector('#userPhoto').files[0]);
            data.append('nativeAddressProof', nativeAddressProof);
            data.append('houseTax', document.querySelector('#houseTax').files[0]);
            data.append('landPatta', document.querySelector('#landPatta').files[0]);
            data.append('electroroll', document.querySelector('#electroroll').files[0]);
            data.append('houserent', document.querySelector('#houserent').files[0]);
            data.append('electrorolltown', document.querySelector('#electrorolltown').files[0]);
            data.append('tradelicence', document.querySelector('#tradelicence').files[0]);
            data.append('schoolrecords', document.querySelector('#schoolrecords').files[0]);
            data.append('passport', document.querySelector('#passport').files[0]);
            data.append('electribill', document.querySelector('#electribill').files[0]);
            data.append('telephonebill', document.querySelector('#telephonebill').files[0]);
            data.append('bankpassbook', document.querySelector('#bankpassbook').files[0]);
            data.append('landtax', document.querySelector('#landtax').files[0]);
            data.append('incomeTaxReturn', document.querySelector('#incomeTaxReturn').files[0]);
            data.append('other', document.querySelector('#other').files[0]);


            $scope.birthCertificateList.forEach(element => {
                data.append('birthCertificate', element)
            })
            $scope.educationalCertificateList.forEach(element => {
                data.append('educationalCertificate', element)
            })
            $scope.marriageCertificateList.forEach(element => {
                data.append('marriageCertificate', element)
            })
            $scope.otherCertificateList.forEach(element => {
                data.append('otherCertificate', element)
            })



            data.append('dimapurLivingProof', document.querySelector('#dimapurLivingProof').files[0]);
            data.append('familyTreeSketch', document.querySelector('#familyTreeSketch').files[0]);
            data.append('filledAppForm', filledAppForm);
            // data.append('otherCertificate', document.querySelector('#otherCertificate').files[0]);
            data.append('govtPhotoId', govtPhotoId);

            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    $scope.showAck = true;
                    $scope.showAppForm = false;
                    window.alert("Your Request Submitted Sucessfully");

                    window.location.href = "http://localhost:1000/user/register";
                }

            };
            data.append('Name1', JSON.stringify(JSON.parse(angular.toJson($scope.data))));
            request.open('POST', "http://localhost:1000/user/signup");
            request.send(data);
        } else {
            window.alert('Upload Mandatory Files');
        }
    }

    $scope.update = function () {
        $scope.data1 = [];
        $scope.data = {};
        if ($scope.material == 'Married') {
            $scope.data.spousetitle = $scope.husband_spousetitle;
            $scope.data.spouse = $scope.husband_spouse;

            $scope.data.husband_spousefathertitle = $scope.husband_spousefathertitle;
            $scope.data.husband_spousename = $scope.husband_spousename;
        }

        $scope.data.tokenNo = $scope.tokenNo;
        $scope.data.nametitle = $scope.ntitle;
        $scope.data.name = $scope.name;
        $scope.data.fatherTitle = $scope.fatherTitle;
        $scope.data.fathername = $scope.fatherName;
        $scope.data.dob = $scope.dob;
        $scope.data.gender = $scope.gender;
        $scope.data.mark = $scope.mark;
        $scope.data.contactno = $scope.contactno;
        $scope.data.addahar = $scope.addahar;
        $scope.data.material = $scope.material;

        if ($scope.material == 'Married') {
            $scope.data.spousetitle = $scope.husband_spousetitle;
            $scope.data.spouse = $scope.husband_spouse;

            $scope.data.husband_spousefathertitle = $scope.husband_spousefathertitle;
            $scope.data.husband_spousename = $scope.husband_spousename;
        }

        $scope.data.presentAddress = {};
        $scope.data.presentAddress.dist = $scope.psdistrict;
        $scope.data.presentAddress.subdivision = $scope.pssubdivision;
        $scope.data.presentAddress.villege = $scope.psvillege;
        $scope.data.presentAddress.policeStation = $scope.pspolicestation;
        $scope.data.presentAddress.postOffice = $scope.pspostoffice;
        $scope.data.presentAddress.nearby = $scope.pslandmark;
        $scope.data.presentAddress.plotno = $scope.psplotno;
        $scope.data.presentAddress.block_lane = $scope.psblock_lane;
        $scope.data.presentAddress.colony = $scope.pscolony;
        $scope.data.presentAddress.pincode = $scope.pspincode;

        $scope.data.permanentAddress = {};
        $scope.data.permanentAddress.state = $scope.prstate;
        $scope.data.permanentAddress.dist = $scope.prdistrict;
        $scope.data.permanentAddress.subdivision = $scope.prsubdivision;
        $scope.data.permanentAddress.villege = $scope.prvillege;
        $scope.data.permanentAddress.policeStation = $scope.prpolicestation;
        $scope.data.permanentAddress.postOffice = $scope.prpostoffice;
        $scope.data.permanentAddress.nearby = $scope.prlandmark;
        $scope.data.permanentAddress.plotno = $scope.prplotno;
        $scope.data.permanentAddress.block_lane = $scope.prblock_lane;
        $scope.data.permanentAddress.colony = $scope.prcolony;
        $scope.data.permanentAddress.pincode = $scope.prpincode;

        $scope.data.occupication = $scope.occupication;
        $scope.data.religion = $scope.religion;

        $scope.data.doresiding = $scope.doresiding;
        $scope.data.nameOfPrimaryApplicantTittle = $scope.primary_applicanttiltle;
        $scope.data.nameOfPrimaryApplicant = $scope.primary_applicant;
        $scope.data.relation = $scope.relation;

        $scope.data.reasonAboveDocuments = $scope.reasonAboveDocuments;
        $scope.data.otherDocuments = $scope.otherDocuments;
        $scope.data.otherCertificateName = $scope.otherCertificateName;
        $scope.data.forwardedTo = $scope.va.UserId;

        $scope.data.otherCertificateName = $scope.otherCertificateName;
        $scope.data.otherDocuments = $scope.otherDocuments;
        $scope.data.reasonAboveDocuments = $scope.reasonAboveDocuments;

        $http.post("http://localhost:1000/user/update", { updateData: $scope.data, applyNo: $scope.applyNo })

            .then(function (response) {
                alert("Your Data is Updated");
                window.location.href = "http://localhost:1000/user/register";
            });
    }
    $scope.loadPsSubdivisions = function () {
        if ($scope.psdistrict != null) {
            $http.get("http://localhost:1000/user/getSubdivisionsOfDistrict?districtCode=" + $scope.psdistrict.districtCode)
                .then(function (response) {
                    $scope.psSubdivList = response.data;
                });
        }
    }
    $scope.loadPrDistricts = function () {
        if ($scope.prstate != null) {
            $http.get("http://localhost:1000/user/dist?stateCode=" + $scope.prstate.stateCode)
                .then(function (response) {
                    $scope.prdistricts = response.data;
                });
        }
    }
    $scope.nativeAddressProof = function () {
        let nativeAddressProof = document.querySelector('#nativeAddressProof').files[0];
        if (nativeAddressProof != undefined) {
            var theSize = nativeAddressProof.size;
            var checkType = nativeAddressProof.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.nativeAddressProofFileGood = "";
                $scope.showNativeAddressProofError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    document.getElementById("nativeAddressProof").value = null;
                    $scope.showNativeAddressProofError = true;
                    $scope.nativeAddressProofFileGood = "File size too large";
                }

            }
            else {
                $scope.nativeAddressProofFileGood = "Wrong file Type Selected";
                $scope.showNativeAddressProofError = true;
                document.getElementById("nativeAddressProof").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.userPhotoCheck = function () {
        let userPhoto = document.querySelector('#userPhoto').files[0];
        if (userPhoto != undefined) {
            var theSize = userPhoto.size;
            var checkType = userPhoto.type;
            if (checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.userPhotoFileGood = "";
                $scope.showUserPhotoError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    document.getElementById("userPhoto").value = null;
                    $scope.showUserPhotoError = true;
                    $scope.userPhotoFileGood = "File size too large";
                }

            }
            else {
                $scope.userPhotoFileGood = "Wrong file Type Selected";
                $scope.showUserPhotoError = true;
                document.getElementById("userPhoto").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.dimapurLivingCheck = function () {
        let dimapurLivingProof = document.querySelector('#dimapurLivingProof').files[0];
        if (dimapurLivingProof != undefined) {
            var theSize = dimapurLivingProof.size;
            var checkType = dimapurLivingProof.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.dimapurLivingProofFileGood = "";
                $scope.showDimapurLivingProofError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.dimapurLivingProofFileGood = "File size too large";
                    $scope.showDimapurLivingProofError = true;
                    document.getElementById("dimapurLivingProof").value = null;

                }

            }
            else {
                $scope.dimapurLivingProofFileGood = "Wrong file Type Selected";
                $scope.showDimapurLivingProofError = true;
                document.getElementById("dimapurLivingProof").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.familyTreeSketchCheck = function () {
        let familyTreeSketch = document.querySelector('#familyTreeSketch').files[0];
        if (familyTreeSketch != undefined) {
            var theSize = familyTreeSketch.size;
            var checkType = familyTreeSketch.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.familyTreeSketchFileGood = "";
                $scope.showFamilyTreeSketchError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.familyTreeSketchFileGood = "File size too large";
                    $scope.showFamilyTreeSketchError = true;
                    document.getElementById("familyTreeSketch").value = null;

                }

            }
            else {
                $scope.familyTreeSketchFileGood = "Wrong file Type Selected";
                $scope.showFamilyTreeSketchError = true;
                document.getElementById("familyTreeSketch").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.applicationCheck = function () {
        let filledAppForm = document.querySelector('#filledAppForm').files[0];
        if (filledAppForm != undefined) {
            var theSize = filledAppForm.size;
            var checkType = filledAppForm.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.filledAppFormFileGood = "";
                $scope.showFilledAppFormError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.filledAppFormFileGood = "File size too large";
                    $scope.showFilledAppFormError = true;
                    document.getElementById("filledAppForm").value = null;

                }

            }
            else {
                $scope.filledAppFormFileGood = "Wrong file Type Selected";
                $scope.showFilledAppFormError = true;
                document.getElementById("filledAppForm").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.govtPhotoIdCheck = function () {
        let govtPhotoId = document.querySelector('#govtPhotoId').files[0];
        if (govtPhotoId != undefined) {
            var theSize = govtPhotoId.size;
            var checkType = govtPhotoId.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.filledGovtPhotoIdGood = "";
                $scope.showgovtPhotoIdError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.filledGovtPhotoIdGood = "File size too large";
                    $scope.showgovtPhotoIdError = true;
                    document.getElementById("govtPhotoId").value = null;

                }

            }
            else {
                $scope.filledGovtPhotoIdGood = "Wrong file Type Selected";
                $scope.showgovtPhotoIdError = true;
                document.getElementById("govtPhotoId").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.houseTaxCheck = function () {
        let houseTax = document.querySelector('#houseTax').files[0];
        if (houseTax != undefined) {
            var theSize = houseTax.size;
            var checkType = houseTax.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.houseTaxFileGood = "";
                $scope.showHouseTaxError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.houseTaxFileGood = "File size too large";
                    $scope.showHouseTaxError = true;
                    document.getElementById("houseTax").value = null;

                }
            }
            else {
                $scope.houseTaxFileGood = "Wrong file Type Selected";
                $scope.showHouseTaxError = true;
                document.getElementById("houseTax").value = null;
            }
        }
        else {
            window.alert('Upload Mandatory Files house tax');
        }
        $scope.$apply();
    }
    $scope.landPattaCheck = function () {
        let landPatta = document.querySelector('#landPatta').files[0];
        if (landPatta != undefined) {
            var theSize = landPatta.size;
            var checkType = landPatta.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.landPattaFileGood = "";
                $scope.showLandPattaError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.landPattaFileGood = "File size too large";
                    $scope.showLandPattaError = true;
                    document.getElementById("landPatta").value = null;

                }

            }
            else {
                $scope.landPattaFileGood = "Wrong file Type Selected";
                $scope.showLandPattaError = true;
                document.getElementById("landPatta").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.electrorollCheck = function () {
        let electroroll = document.querySelector('#electroroll').files[0];
        if (electroroll != undefined) {
            var theSize = electroroll.size;
            var checkType = electroroll.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.electroRollFileGood = "";
                $scope.showelEctroRollError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.electroRollFileGood = "File size too large";
                    $scope.showelEctroRollError = true;
                    document.getElementById("electroroll").value = null;

                }

            }
            else {
                $scope.electroRollFileGood = "Wrong file Type Selected";
                $scope.showelEctroRollError = true;
                document.getElementById("electroroll").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.electrorolltownCheck = function () {
        let electrorolltown = document.querySelector('#electrorolltown').files[0];
        if (electrorolltown != undefined) {
            var theSize = electrorolltown.size;
            var checkType = electrorolltown.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.electroRollTownFileGood = "";
                $scope.showElectroRollTownError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.electroRollTownFileGood = "File size too large";
                    $scope.showElectroRollTownError = true;
                    document.getElementById("electrorolltown").value = null;

                }

            }
            else {
                $scope.electroRollTownFileGood = "Wrong file Type Selected";
                $scope.showElectroRollTownError = true;
                document.getElementById("electrorolltown").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.houserentCheck = function () {
        let houserent = document.querySelector('#houserent').files[0];
        if (houserent != undefined) {
            var theSize = houserent.size;
            var checkType = houserent.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.houseRentFileGood = "";
                $scope.showHouseRentError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.houseRentFileGood = "File size too large";
                    $scope.showHouseRentError = true;
                    document.getElementById("houserent").value = null;

                }

            }
            else {
                $scope.houseRentFileGood = "Wrong file Type Selected";
                $scope.showHouseRentError = true;
                document.getElementById("houserent").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.tradelicenceCheck = function () {
        let tradelicence = document.querySelector('#tradelicence').files[0];
        if (tradelicence != undefined) {
            var theSize = tradelicence.size;
            var checkType = tradelicence.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.tradeLicenceFileGood = "";
                $scope.showTradeLicenceError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.tradeLicenceFileGood = "File size too large";
                    $scope.showTradeLicenceError = true;
                    document.getElementById("tradelicence").value = null;

                }

            }
            else {
                $scope.tradeLicenceFileGood = "Wrong file Type Selected";
                $scope.showTradeLicenceError = true;
                document.getElementById("tradelicence").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.schoolrecordsCheck = function () {
        let schoolrecords = document.querySelector('#schoolrecords').files[0];
        if (schoolrecords != undefined) {
            var theSize = schoolrecords.size;
            var checkType = schoolrecords.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.schoolRecordsFileGood = "";
                $scope.showSchoolRecordsError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.schoolRecordsFileGood = "File size too large";
                    $scope.showSchoolRecordsError = true;
                    document.getElementById("schoolrecords").value = null;

                }

            }
            else {
                $scope.schoolRecordsFileGood = "Wrong file Type Selected";
                $scope.showSchoolRecordsError = true;
                document.getElementById("schoolrecords").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.passportCheck = function () {
        let passport = document.querySelector('#schoolrecords').files[0];
        if (passport != undefined) {
            var theSize = passport.size;
            var checkType = passport.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.passportFileGood = "";
                $scope.showPassportError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.passportFileGood = "File size too large";
                    $scope.showPassportError = true;
                    document.getElementById("passport").value = null;

                }

            }
            else {
                $scope.passportFileGood = "Wrong file Type Selected";
                $scope.showPassportError = true;
                document.getElementById("passport").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.electribillCheck = function () {
        let electribill = document.querySelector('#electribill').files[0];
        if (electribill != undefined) {
            var theSize = electribill.size;
            var checkType = electribill.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.electriBillFileGood = "";
                $scope.showElectriBillError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.electriBillFileGood = "File size too large";
                    $scope.showElectriBillError = true;
                    document.getElementById("electribill").value = null;

                }

            }
            else {
                $scope.electriBillFileGood = "Wrong file Type Selected";
                $scope.showElectriBillError = true;
                document.getElementById("electribill").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.telephonebillCheck = function () {
        let telephonebill = document.querySelector('#telephonebill').files[0];
        if (telephonebill != undefined) {
            var theSize = telephonebill.size;
            var checkType = telephonebill.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.telephoneBillFileGood = "";
                $scope.showTelephoneBillError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.telephoneBillFileGood = "File size too large";
                    $scope.showTelephoneBillError = true;
                    document.getElementById("telephonebill").value = null;

                }

            }
            else {
                $scope.telephoneBillFileGood = "Wrong file Type Selected";
                $scope.showTelephoneBillError = true;
                document.getElementById("telephonebill").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.bankpassbookCheck = function () {
        let bankpassbook = document.querySelector('#bankpassbook').files[0];
        if (bankpassbook != undefined) {
            var theSize = bankpassbook.size;
            var checkType = bankpassbook.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.bankPassbookFileGood = "";
                $scope.showBankPassbookError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.bankPassbookFileGood = "File size too large";
                    $scope.showBankPassbookError = true;
                    document.getElementById("bankpassbook").value = null;

                }

            }
            else {
                $scope.bankPassbookFileGood = "Wrong file Type Selected";
                $scope.showBankPassbookError = true;
                document.getElementById("bankpassbook").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.landtaxCheck = function () {
        let landtax = document.querySelector('#landtax').files[0];
        if (landtax != undefined) {
            var theSize = landtax.size;
            var checkType = landtax.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.landTaxFileGood = "";
                $scope.showLandTaxError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.landTaxFileGood = "File size too large";
                    $scope.showLandTaxError = true;
                    document.getElementById("landtax").value = null;

                }

            }
            else {
                $scope.landTaxFileGood = "Wrong file Type Selected";
                $scope.showLandTaxError = true;
                document.getElementById("landtax").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.incomeTaxReturnCheck = function () {
        let incomeTaxReturn = document.querySelector('#incomeTaxReturn').files[0];
        if (incomeTaxReturn != undefined) {
            var theSize = incomeTaxReturn.size;
            var checkType = incomeTaxReturn.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.incomeTaxFileGood = "";
                $scope.showIncomeTaxrError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.incomeTaxFileGood = "File size too large";
                    $scope.showIncomeTaxrError = true;
                    document.getElementById("incomeTaxReturn").value = null;

                }

            }
            else {
                $scope.incomeTaxFileGood = "Wrong file Type Selected";
                $scope.showIncomeTaxrError = true;
                document.getElementById("incomeTaxReturn").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.otherCheck = function () {
        let other = document.querySelector('#other').files[0];
        if (other != undefined) {
            var theSize = other.size;
            var checkType = other.type;
            if (checkType == "application/pdf" || checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
                $scope.otherFileGood = "";
                $scope.showOtherError = false;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    $scope.otherFileGood = "File size too large";
                    $scope.showOtherError = true;
                    document.getElementById("other").value = null;

                }

            }
            else {
                $scope.otherFileGood = "Wrong file Type Selected";
                $scope.showOtherError = true;
                document.getElementById("other").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    $scope.houseTaxFileCheck = function () {
        if (document.getElementById('houseTaxId').checked == true) {
            $scope.houseTaxFileGood = " Upload a mandatory file";
            $scope.showHouseTaxError = true;
        }
        else {
            $scope.houseTaxFileGood = "";
            $scope.showHouseTaxError = false;
            document.getElementById("houseTax").value = null;
            
        }

    }
    $scope.landPattaFileCheck = function () {


        if (document.getElementById('landPattaId').checked == true) {
            $scope.landPattaFileGood = " Upload a mandatory file";
            $scope.showLandPattaError = true;
        }
        else {
            $scope.landPattaFileGood = "";
            $scope.showLandPattaError = false;
            document.getElementById("landPatta").value = null;
        }


    }
    $scope.electrorollFileCheck = function () {


        if (document.getElementById('electrorollId').checked == true) {
            $scope.electroRollFileGood = " Upload a mandatory file";
            $scope.showelEctroRollError = true;
        }
        else {
            $scope.electroRollFileGood = "";
            $scope.showelEctroRollError = false;
            document.getElementById("electroroll").value = null;
        }


    }
    $scope.electrorolltownFileCheck = function () {


        if (document.getElementById('electrorolltownId').checked == true) {
            $scope.electroRollTownFileGood = " Upload a mandatory file";
            $scope.showElectroRollTownError = true;
        }
        else {
            $scope.electroRollTownFileGood = "";
            $scope.showElectroRollTownError = false;
            document.getElementById("electrorolltown").value = null;
        }


    }
    $scope.houserentFileCheck = function () {


        if (document.getElementById('houserentId').checked == true) {
            $scope.houseRentFileGood = " Upload a mandatory file";
            $scope.showHouseRentError = true;
        }
        else {
            $scope.houseRentFileGood = "";
            $scope.showHouseRentError = false;
            document.getElementById("houserent").value = null;
        }


    }
    $scope.tradelicenceFileCheck = function () {


        if (document.getElementById('tradelicenceId').checked == true) {
            $scope.tradeLicenceFileGood = " Upload a mandatory file";
            $scope.showTradeLicenceError = true;
        }
        else {
            $scope.tradeLicenceFileGood = "";
            $scope.showTradeLicenceError = false;
            document.getElementById("electrorolltown").value = null;
        }


    }
    $scope.schoolrecordsFileCheck = function () {


        if (document.getElementById('schoolrecordsId').checked == true) {
            $scope.schoolRecordsFileGood = " Upload a mandatory file";
            $scope.showSchoolRecordsError = true;
        }
        else {
            $scope.schoolRecordsFileGood = "";
            $scope.showSchoolRecordsError = false;
            document.getElementById("schoolrecords").value = null;
        }


    }
    $scope.passportFileCheck = function () {


        if (document.getElementById('passportId').checked == true) {
            $scope.passportFileGood = " Upload a mandatory file";
            $scope.showPassportError = true;
        }
        else {
            $scope.passportFileGood = "";
            $scope.showPassportError = false;
            document.getElementById("passport").value = null;
        }


    }
    $scope.electribillFileCheck = function () {


        if (document.getElementById('electribillId').checked == true) {
            $scope.electriBillFileGood = " Upload a mandatory file";
            $scope.showElectriBillError = true;
        }
        else {
            $scope.electriBillFileGood = "";
            $scope.showElectriBillError = false;
            document.getElementById("electribill").value = null;
        }


    }
    $scope.telephonebillFileCheck = function () {


        if (document.getElementById('telephonebillId').checked == true) {
            $scope.telephoneBillFileGood = " Upload a mandatory file";
            $scope.showTelephoneBillError = true;
        }
        else {
            $scope.telephoneBillFileGood = "";
            $scope.showTelephoneBillError = false;
            document.getElementById("telephonebill").value = null;
        }


    }
    $scope.bankpassbookFileCheck = function () {


        if (document.getElementById('bankpassbookId').checked == true) {
            $scope.bankPassbookFileGood = " Upload a mandatory file";
            $scope.showBankPassbookError = true;
        }
        else {
            $scope.bankPassbookFileGood = "";
            $scope.showBankPassbookError = false;
            document.getElementById("bankpassbook").value = null;
        }


    }
    $scope.landtaxFileCheck = function () {


        if (document.getElementById('landtaxId').checked == true) {
            $scope.landTaxFileGood = " Upload a mandatory file";
            $scope.showLandTaxError = true;
        }
        else {
            $scope.landTaxFileGood = "";
            $scope.showLandTaxError = false;
            document.getElementById("landtax").value = null;
        }


    }
    $scope.incomeTaxReturnFileCheck = function () {


        if (document.getElementById('incomeTaxReturnId').checked == true) {
            $scope.incomeTaxFileGood = " Upload a mandatory file";
            $scope.showIncomeTaxrError = true;
        }
        else {
            $scope.incomeTaxFileGood = "";
            $scope.showIncomeTaxrError = false;
            document.getElementById("lanincomeTaxReturndtax").value = null;
        }


    }
    $scope.otherFileCheck = function () {


        if (document.getElementById('otherId').checked == true) {
            $scope.otherFileGood = " Upload a mandatory file";
            $scope.showOtherError = true;
        }
        else {
            $scope.otherFileGood = "";
            $scope.showOtherError = false;
            document.getElementById("other").value = null;
        }


    }
})
app.directive("allowNumbersOnly", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9.]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});



