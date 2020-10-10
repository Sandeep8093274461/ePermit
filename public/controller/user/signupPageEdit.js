var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    
   
    $scope.signup = function (y) {
        $http.get("http://localhost:1000/user/allApprovedataForLifeYear?userId=" + userId)
            .then(function (response) {
                $scope.alldata = response.data;
            });
    }
    $scope.signup();
    $scope.view = function (y,x) {
        $scope.applyNo = y;
        $scope.register =x;
        if($scope.register =="oneYear"){
            window.location.href = "http://localhost:1000/user/registerforOneYear?applyNo=" + $scope.applyNo  ;
        }
        else{
            window.location.href = "http://localhost:1000/user/register?applyNo=" + $scope.applyNo + "&register=" + $scope.register ;
        }
    }



});