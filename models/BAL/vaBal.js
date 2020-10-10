var mongo = require('../mongo/mongo');

exports.getVerifyLicenceForLifeTime = function (userId, callback) {
    let aggregation = [
        { $match: { register: "lifeTime", forwardedTo: userId } },
        { $match: { status: "Pending"} }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.getVerifyLicenceForOneYear = function (userId, callback) {
    let aggregation = [
        { $match: { register: "oneYear" ,forwardedTo: userId} },
        { $match: { status: "Pending"} }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.reject = (data, callback) => {
    var query = { applyNo: data.applyNo };
    var newValue = { status: "Rejected", "rejectedBy": data.userId, "rejectedOn": new Date().toLocaleDateString(), "remark": data.remark };
    mongo.updateOne(query, newValue, "signup", function (response) {
        callback(response);
    });
};
exports.verify = (data, callback) => {
    var query = { applyNo: data.applyNo };
    var newValue = { status: "Verified", "VerifiedBy": data.userId, "verifiedOn": new Date().toLocaleDateString() };
    mongo.updateOne(query, newValue, "signup", function (response) {
        callback(response);
    });
};
exports.getAllVerifiedDataForLifeTime = function (userId,callback) {
   
    let aggregation = [
        { $match: { register: "lifeTime",VerifiedBy: userId  } },
        { $match: { status: "Verified" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.getAllVerifiedDataForOneYear = function (userId,callback) {
    let aggregation = [
        { $match: { register: "oneYear",forwardedTo: userId  } },
        { $match: { status: "Verified" } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
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