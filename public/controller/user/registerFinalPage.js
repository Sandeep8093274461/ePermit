var app = angular.module("myApp", [])
app.controller("myCtr", function ($scope, $http) {
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.applyNo = applyNo;
    $scope.signup = function (y) {  
        $http.get("http://localhost:1000/user/allPendingData?applyNo="+applyNo)
            .then(function (response) {
                $scope.alldata = response.data;
            });
    }
    $scope.signup(); 
    $scope.back = function () {
        window.location.href = "http://localhost:1000/user/register" ;
    }
    $scope.print = function () {
        window.location.href = "http://localhost:1000/user/register" ;
    }

});