var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.allVeririfiedData = function (y) {
        $http.get("http://localhost:1000/admin/getAllVeririfiedDataForLifeTime")
            .then(function (response) {
                $scope.alldata = response.data;
            });
    }
    $scope.allVeririfiedData();
    
    $scope.rejected = function (y) {
        $scope.allDetails = y;
    }
    $scope.verified = function (y) {
        $scope.allDetails = y;
        $scope.distId = $scope.allDetails.presentAddress.dist.distId;
    }
   
    $scope.reject = function (applyNo) {
        $http.post("http://localhost:1000/admin/rejectLicence", {userId: userId, applyNo: applyNo})
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.rejectedReson =" ";
                $scope.allVeririfiedData();
            });
    }
    $scope.approve = function (applyNo) {
        $http.post("http://localhost:1000/admin/approveLicence",{ userId : userId, applyNo : applyNo, distId: $scope.distId })
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.allVeririfiedData();
            });
    }

});