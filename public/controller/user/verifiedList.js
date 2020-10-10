var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.signup = function (y) {
        $http.get("http://localhost:1000/user/alldata")
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
   
    $scope.reject = function (y) {
        var data = [];
        var mData = {};
        mData.uname = "Admin";
        mData.applyNo = y;
        mData.remark = $scope.rejectedReson;
        data.push(mData);
        $http.post("http://localhost:1000/user/reject",data)
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.signup();
            });
    }
    $scope.verify = function (y) {
        var data = [];
        var mData = {};
        mData.uname = "Admin";
        mData.applyNo = y;
        data.push(mData);
        $http.post("http://localhost:1000/user/verify",data)
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.signup();
            });
    }

});