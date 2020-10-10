var mongo = require('../mongo/mongo');
exports.getUserDetails = function (username,callback) {
    var aggregation = [
            {$match:{userId:username}},
            { $project: { _id: 0, userId : 1, password : 1,role : 1,no:1} }];
    mongo.queryWithAggregator(aggregation, "users", function (response) {
        callback(response);
        
    });
};
exports.getUserDetailsByUserId = function (userId, callback) {   
    var aggregation = [       
        {$match:{UserId:userId}},
        { $project: { _id: 0, userId : 1,Name:1,Role:1,no:1} }];
mongo.queryWithAggregator(aggregation, "userMaster", function (response) {
    callback(response);
    });
};