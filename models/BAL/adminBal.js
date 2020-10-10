var mongo = require('../mongo/mongo');
exports.getAllVeririfiedDataForLifeTime = function (callback) {
    let aggregation = [
        { $match: { register: "lifeTime" } },
        { $match: { status: "Verified" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};

exports.getAllVeririfiedDataForOneYear = function (callback) {
    let aggregation = [
        { $match: { register: "oneYear" } },
        { $match: { status: "Verified" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.getAllApprovedDataForLifeTime = function (callback) {
    let aggregation = [
        { $match: { register: "lifeTime" } },
        { $match: { status: "Approve" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.getAllApprovedDataForOneYear = function (callback) {
    let aggregation = [
        { $match: { register: "oneYear" } },
        { $match: { status: "Approve" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.rejectLicence = (data, callback) => {
    let mQuery = { applyNo: data.applyNo };
    let newValue = { status: "Rejected", "rejectedBy": data.userId, "rejectedOn": new Date(), "remark": data.remark };
    mongo.updateOne(mQuery, newValue, "signup", function (response) {
        callback(response);
    });
};
exports.approveLicence = (data, callback) => {
    let distId = data.distId;
   

    var aggregation = [
        { $project: { _id: 0, registrationNo: 1 } },
        { $project: { distId: { $substr: ["$registrationNo", 0, 2] }, regNo: "$registrationNo" } },
        { $match: { "distId" : distId} },
        { $project: { regNo: { $substr: ["$regNo", 2, "$registrationNo".length - 1] } } },
        { $unwind: "$regNo" },
        { $project: { _id: 0, maxNo: { $toInt: "$regNo" } } },
        { $sort: { maxNo: -1 } }
    ]


    mongo.queryWithAggregator(aggregation, "signup", async function (regNoResult) {
        let regNo = regNoResult.length == 0 ? `${distId}0000001` : `${distId+''+(parseInt(regNoResult[0].maxNo) + 1).toString().padStart(7, "0")}`;
        var mQuery = { applyNo: data.applyNo };
        var newValue = { registrationNo : regNo, status: "Approve", "approvedBy": data.userId, "approvedOn": new Date() };
        mongo.updateOne(mQuery, newValue, "signup", function (response) {
            callback(response);
        });
    });
};
exports.allPendingData = (applyNo, callback) => {
    
    var aggregation = [
        { $match: { applyNo : applyNo } },
        { $project: { _id: 0} }
    ];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response[0])
    })
}

exports.getStates = function (callback) {

    var aggregation = [{ $project: { _id: 0, stateName: 1, stateCode: 1 } }];

    mongo.queryWithAggregator(aggregation, "stateMaster", function (response) {
        callback(response);
    });
};
exports.getDistricts = function (stateCode, callback) {
    var aggregation = [
        { $match: { stateCode: stateCode } },
        { $project: { districtName: 1, districtCode: 1, _id: 0 } },
    ];
    mongo.queryWithAggregator(aggregation, "districtMaster", function (response) {
        callback(response);
    });
};