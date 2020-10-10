var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.applyNo = applyNo;
    $scope.signup = function (y) {   
        $http.get("http://localhost:1000/user/allRejectedgData?applyNo="+applyNo)
            .then(function (response) {
                $scope.alldata = response.data;
            });
    }
    $scope.signup(); 
    $scope.back = (y) => {
        if(y == 'oneYear')
        {
            window.location.href = "http://localhost:1000/user/approveLicencesForOneYear";
        }
        else
        {
            window.location.href = "http://localhost:1000/user/approveLicencesForLifeTime";
        }
        
    }

});