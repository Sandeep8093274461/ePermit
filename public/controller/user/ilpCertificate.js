var app = angular.module("myApp", []);
app.controller("myCtr", function ($scope, $http) {
    var userName = document.querySelector('meta[name="userName"]').getAttribute('content');
    var userRole = document.querySelector('meta[name="userRole"]').getAttribute('content');
    
    $scope.userName = userName;
    $scope.userRole = userRole;
    $scope.regNo = regNo;
    $http.get("http://localhost:1000/user/getApplicantDetail?regNo="+regNo)
    .then(function (response) {
        $scope.data = response.data;
        $scope.data.approvedOn = new Date($scope.data.approvedOn);
        let qrCodeText = `Registration No = ${response.data.registrationNo}, Name = ${response.data.nametitle} ${response.data.name}, D.O.B. = ${new Date(response.data.dob).toDateString()}, Identification Mark = ${response.data.mark} `;
           var qrcode = new QRCode("qrcode", {
            text: SHA256(qrCodeText),
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    });


    $scope.back = () => {
        window.location.href = "http://localhost:1000/user/trackApplicationForLifeTime"
    }
});
