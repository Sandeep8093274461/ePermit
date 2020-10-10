var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.controller("myCtr", function ($scope, $http) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.signup = function (y) {  
        $http.get("http://localhost:1000/user/getRejectedListForLifeTime?userId=" + userId)
            .then(function (response) {
                $scope.alldata = response.data;
                $scope.alldata.forEach((item) => {
                    item.stateCode =  item.permanentAddress.state.stateCode;
                    item.districtCode =  item.permanentAddress.dist.districtCode;
               });
              
            });
    }
    $scope.loadStates = function () {
        $http.get("http://localhost:1000/user/state")
            .then(function (response) {
                $scope.states = response.data;
            });
    }
    $scope.loadFromDistricts = function () {
        if ($scope.fromStateFilter != null) {
            $http.get("http://localhost:1000/user/dist?stateCode=" + $scope.fromStateFilter.stateCode)
                .then(function (response) {
                    $scope.fromdistricts = response.data;
                });
        }
    }
    $scope.loadStates();
    $scope.signup(); 
    $scope.view = function (y) {
        $scope.alldata = y;
        $scope.applyNo = y;
        window.location.href = "http://localhost:1000/user/viewRejectedPage?applyNo=" + $scope.applyNo;
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