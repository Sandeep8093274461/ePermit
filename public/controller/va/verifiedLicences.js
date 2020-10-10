var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http, $window) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    $scope.allApprovedData = function (y) {
        $http.get("http://localhost:1000/va/getAllVerifiedDataForLifeTime?userId=" + userId)
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.alldata.forEach((item) => {
                    item.stateCode =  item.permanentAddress.state.stateCode;
                    item.districtCode =  item.permanentAddress.dist.districtCode;
                    
               });
              
            });
    }
    $scope.loadStates = function () {
        $http.get("http://localhost:1000/va/state")
            .then(function (response) {
                $scope.states = response.data;
            });
    }
    $scope.loadFromDistricts = function () {
        if ($scope.fromStateFilter != null) {
            $http.get("http://localhost:1000/va/dist?stateCode=" + $scope.fromStateFilter.stateCode)
                .then(function (response) {
                    $scope.fromdistricts = response.data;
                });
        }
    }
    $scope.loadStates();
    $scope.allApprovedData();
    
    $scope.view = function (y) {
        $scope.allDetails = y;
        window.location.href = "http://localhost:1000/va/viewPage?applyNo=" + $scope.allDetails.applyNo;
    }
   

});

app.filter('dateRangeFrom', function () {
    return function (alldata, fromDateFilter) {
        var filtered = [];
        if (fromDateFilter != undefined) {
            angular.forEach(alldata, y=> {
                if (Date.parse(y.AppliedOn) >= Date.parse(fromDateFilter)) {
                    filtered.push(y);
                }
            });
            return filtered;
        } else {
            return alldata;
        }
    };
});
app.filter('dateRangeTo', function () {
    return function (alldata, toDateFilter) {
        var filtered = [];
        if (toDateFilter != undefined) {
            var day = 60 * 60 * 24 * 1000;
            angular.forEach(alldata, function (y) {
                if (Date.parse(y.AppliedOn) <= new Date(toDateFilter.getTime() + day)) {
                    filtered.push(y);
                }
            });
            return filtered;
        } else {
            return alldata;
        }
    };
});