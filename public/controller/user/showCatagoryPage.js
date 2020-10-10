
var app = angular.module("myApp", [])
app.controller("myCtr", function ($scope, $http, $filter) {

    $scope.categor = function () {
        $http.get("http://localhost:1000/user/getAllData")
            .then(function (response) {
                $scope.allData = response.data[0];
            });
    }
    $scope.categor();
})



