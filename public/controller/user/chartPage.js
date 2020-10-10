var app = angular.module("myApp", [])
app.controller("myCtr", function ($scope, $http, $filter) {
    var userId = document.querySelector('meta[name="userId"]').getAttribute('content');
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    

    $scope.loadAllState = function () {
        $http.get("http://localhost:1000/user/loadAllState")
            .then(function (response) {
                $scope.allStateList = response.data;
                var bar = document.getElementById('noOfPersonBar').getContext('2d');
                var pie = document.getElementById('noOfPersonPie').getContext('2d');
                let stateLabels = [];
                let noOfStates = [];
                $scope.allStateList.forEach(function (element) {
                    stateLabels.push(element.stateName);
                    noOfStates.push(element.count);
                })

                var chart = new Chart(bar, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: stateLabels,
                        datasets: [{
                            label: 'Number Of Person Applied',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: noOfStates
                        }]
                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Application Applied In StateWise'
                        }
                    },

                });
                var myPieChart = new Chart(pie, {
                    // The type of chart we want to create
                    type: 'pie',

                    // The data for our dataset
                    data: {
                        datasets: [{
                            backgroundColor: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50", "#FF6347", "#DAA520", "#14E7D7", "#7FFF00", "#00FA9A", "#3CB371", "#008080", "#8A2BE2", "#800080", "#FF00FF", "#8B4513", "#800080", "#EE82EE", "#4B0082", "#00008B", "#87CEFA", "#4682B4", "#8B008B", "#48D1CC", "#008080", "#00FF7F", "#008000", "#808000", "#FF7F50", "#008000"],
                            borderColor: '#0000',
                            data: noOfStates,

                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: stateLabels,

                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Application Applied In StateWise'
                        }

                    }
                });
            });
    }


    $scope.loadAllReligion = function () {
        $http.get("http://localhost:1000/user/loadAllReligion")
            .then(function (response) {
                $scope.allReligionList = response.data;
                var bar = document.getElementById('noOfReligionBar').getContext('2d');
                var pie = document.getElementById('noOfReligionPie').getContext('2d');
                let religionLebels = [];
                let noOfReligion = [];
                $scope.allReligionList.forEach(function (element) {
                    religionLebels.push(element.religion);
                    noOfReligion.push(element.count);
                })


                var chart = new Chart(bar, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: religionLebels,
                        datasets: [{
                            label: 'Number Of Religion Applied',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: noOfReligion
                        }]
                    },

                    // Configuration options go here

                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Application Applied In Relationwise'
                        }

                    }

                });

                var myPieChart = new Chart(pie, {
                    // The type of chart we want to create
                    type: 'pie',

                    // The data for our dataset
                    data: {
                        datasets: [{
                            backgroundColor: ["#fad84a", "#4caf50", "#FF6347", "#DAA520", "#EE82EE", "#7FFF00"],
                            borderColor: '#0000',
                            data: noOfReligion,

                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: religionLebels
                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Application Applied In Relationwise'
                        }

                    }
                });

            });
    }


    $scope.loadAllGender = function () {
        $http.get("http://localhost:1000/user/loadAllGender")
            .then(function (response) {
                $scope.allGenderList = response.data;
                var ctx = document.getElementById("noOfGenderBar").getContext('2d');
                // var pie = document.getElementById('noOfApprovedPie').getContext('2d');
                let genderLebels = [];
                let noOfMale = [];
                let noOfFemale = [];
                let stateLabels = [];
                $scope.allGenderList.forEach(function (element) {
                    stateLabels.push(element.stateName);
                    noOfMale.push(element.maleCount);
                    noOfFemale.push(element.femaleCount);

                })
                var myChart = new Chart(ctx, {
                    type: 'bar',

                    data: {
                        labels: stateLabels,
                        datasets: [{
                            label: 'Female',
                            data: noOfFemale,
                            backgroundColor: "rgba(153,255,51,1)"
                        }, {
                            label: 'Male',
                            data: noOfMale,
                            backgroundColor: "rgba(255,153,0,1)"
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Application Applied In Relationwise'
                        }

                    }
                });

            });
    }



    $scope.loadGender = function () {
        $http.get("http://localhost:1000/user/loadGender")
            .then(function (response) {
                $scope.allGenderList = response.data;
                // var ctx = document.getElementById("noOfApprovedBar").getContext('2d');
                var pie = document.getElementById('noOfGenderPie').getContext('2d');
                let genderLebels = [];
                let noOfGender = [];
                $scope.allGenderList.forEach(function (element) {
                    genderLebels.push(element.gender);
                    noOfGender.push(element.count);
                })


                var myPieChart = new Chart(pie, {
                    // The type of chart we want to create
                    type: 'pie',

                    // The data for our dataset
                    data: {
                        datasets: [{
                            backgroundColor: ["#fad84a", "#4caf50"],
                            borderColor: '#0000',
                            data: noOfGender,

                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: genderLebels
                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: 'Total Number Of Male Or Female Applied '
                        }

                    }
                });

            });
    }
    $scope.loadAllState();
    $scope.loadGender();
    $scope.loadAllReligion();
    $scope.loadAllGender();







    //     var ctx = document.getElementById("noOfApprovedBar").getContext('2d');
    // var myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ["M", "T", "W", "T", "F", "S", "S"],
    //     datasets: [{
    //       label: 'apples',
    //       data: [12, 19, 3, 17, 28, 24, 7],
    //       backgroundColor: "rgba(153,255,51,1)"
    //     }, {
    //       label: 'oranges',
    //       data: [30, 29, 5, 5, 20, 3, 10],
    //       backgroundColor: "rgba(255,153,0,1)"
    //     }]
    //   }
    // });
    // var pie = document.getElementById('noOfApprovedPie').getContext('2d');


})