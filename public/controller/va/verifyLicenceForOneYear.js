var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;

    $scope.signup = function (y) {
        $http.get("http://localhost:1000/va/getVerifyLicenceForOneYear?userId=" + userId)
            .then(function (response) {
                $scope.alldata = response.data;
            });
    }
    $scope.signup();
    
    $scope.rejected = function (y) {
        $scope.allDetails = y;
    }
    $scope.verified = function (y) {
        $scope.allDetails = y;
    }
   
    $scope.reject = function (applyNo) {
        $http.post("http://localhost:1000/va/reject",{userId: userId, applyNo: applyNo, remark: $scope.rejectedReson})
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.rejectedReson =" ";
                $scope.signup();
            });
    }
    $scope.verify = function (applyNo) {
        $http.post("http://localhost:1000/va/verify", {userId: userId, applyNo: applyNo})
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.signup();
            });
    }

});