var mongo = require('../mongo/mongo');

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
exports.getDistrictOfNagaland = function (callback) {
    var aggregation = [
        { $match: { stateCode: "13" } },
        { $project: { districtName: 1, districtCode: 1, distId: 1, _id: 0 } }
    ];
    mongo.queryWithAggregator(aggregation, "districtMaster", function (response) {
        callback(response);
    })
};
exports.getBlocks = function (districtCode, callback) {
    var aggregation = [

        { $match: { districtCode: districtCode } },
        { $project: { blockName: 1, blockCode: 1, _id: 0 } },

    ];
    mongo.queryWithAggregator(aggregation, "blockMaster", function (response) {
        callback(response);
    });
};
exports.getVilleges = function (blockCode, callback) {
    var aggregation = [

        { $match: { blockCode: blockCode } },
        { $project: { villageName: 1, villageCode: 1, _id: 0 } },

    ];
    mongo.queryWithAggregator(aggregation, "villegeMaster", function (response) {
        callback(response);
    })
};
exports.signup = (data, callback) => {
    mongo.findOne('config', (result) => {
        var aggregation = [
            { $project: { _id: 0, applyNo: 1 } },
            { $project: { applyNo: { $split: ["$applyNo", "/"] } } },
            { $project: { applyNo: { $arrayElemAt: ["$applyNo", 1] } } },
            { $unwind: "$applyNo" },
            { $project: { _id: 0, applyNo: { $toInt: "$applyNo" } } },
            { $sort: { applyNo: -1 } },
        ]
        mongo.queryWithAggregator(aggregation, 'signup', async (response) => {
            if (response.length == 0) {
                data.applyNo = "" + new Date().getFullYear() + "/1"
            } else {
                data.applyNo = "" + new Date().getFullYear() + "/" + (parseInt(response[0].applyNo) + 1);
            }
            data.register = "lifeTime";
            data.AppliedBy = data.userId;
            data.AppliedOn = new Date();
            data.dob = new Date(data.dob);
            if (result.mode == '1') {
                let distId = data.presentAddress.dist.distId;
                var licenseAggregation = [
                    { $project: { _id: 0, registrationNo: 1 } },
                    { $project: { distId: { $substr: ["$registrationNo", 0, 2] }, regNo: "$registrationNo" } },
                    { $match: { "distId": distId } },
                    { $project: { regNo: { $substr: ["$regNo", 2, "$registrationNo".length - 1] } } },
                    { $unwind: "$regNo" },
                    { $project: { _id: 0, maxNo: { $toInt: "$regNo" } } },
                    { $sort: { maxNo: -1 } }
                ]
                let regNoResult = await mongo.queryWithAggregatorPromise(licenseAggregation, 'signup');
                data.registrationNo = regNoResult.length == 0 ? `${distId}0000001` : `${distId + '' + (parseInt(regNoResult[0].maxNo) + 1).toString().padStart(7, "0")}`;
                data.verifiedBy = data.forwardedTo;
                data.verifiedOn = new Date();
                data.approvedBy = "Signature Of Isuuing Authority";
                data.approvedOn = new Date();
                data.status = "Approve";
            } else {
                data.status = "Pending";
            }
            mongo.insertDocument(data, 'signup', result => {
                callback(data.applyNo);
            });
        });
    });
};
exports.signupForOneYear = (data, callback) => {
    mongo.findOne('config', (result) => {
        var aggregation = [
            { $project: { _id: 0, applyNo: 1 } },
            { $project: { applyNo: { $split: ["$applyNo", "/"] } } },
            { $project: { applyNo: { $arrayElemAt: ["$applyNo", 1] } } },
            { $unwind: "$applyNo" },
            { $project: { _id: 0, applyNo: { $toInt: "$applyNo" } } },
            { $sort: { applyNo: -1 } },
        ]
        mongo.queryWithAggregator(aggregation, 'signup', async (response) => {
            if (response.length == 0) {
                data.applyNo = "" + new Date().getFullYear() + "/1"
            } else {
                data.applyNo = "" + new Date().getFullYear() + "/" + (parseInt(response[0].applyNo) + 1);
            }
            data.register = "oneYear";
            data.AppliedBy = data.userId;
            data.AppliedOn = new Date();
            data.dob = new Date(data.dob);
            if (result.mode == '1') {
                let distId = data.presentAddress.dist.distId;
                var licenseAggregation = [
                    { $project: { _id: 0, registrationNo: 1 } },
                    { $project: { distId: { $substr: ["$registrationNo", 0, 2] }, regNo: "$registrationNo" } },
                    { $match: { "distId": distId } },
                    { $project: { regNo: { $substr: ["$regNo", 2, "$registrationNo".length - 1] } } },
                    { $unwind: "$regNo" },
                    { $project: { _id: 0, maxNo: { $toInt: "$regNo" } } },
                    { $sort: { maxNo: -1 } }
                ]
                let regNoResult = await mongo.queryWithAggregatorPromise(licenseAggregation, 'signup');
                data.registrationNo = regNoResult.length == 0 ? `${distId}0000001` : `${distId + '' + (parseInt(regNoResult[0].maxNo) + 1).toString().padStart(7, "0")}`;
                data.verifiedBy = data.forwardedTo;
                data.verifiedOn = new Date();
                data.approvedBy = "Signature Of Isuuing Authority";
                data.approvedOn = new Date();
                var k = new Date().getFullYear() + 1;
                var validUpto = new Date(new Date().setFullYear(k));
                data.validUpto = validUpto;
                data.status = "Approve";
            } else {
                data.status = "Pending";
            }
            mongo.insertDocument(data, 'signup', result => {
                callback(data.applyNo);
            });
        });
    });
};
exports.alldataForLifeYear = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Pending", AppliedBy: userId, register: "lifeTime" } },
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.allApprovedataForLifeYear = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Approve", AppliedBy: userId, register: "lifeTime" } },
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.alldataForOneYear = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Pending", AppliedBy: userId, register: "oneYear" } },
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.allApprovedataForOneYear = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Approve", AppliedBy: userId, register: "oneYear" } },
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.getApplicationDetails = function (applyNo, callback) {

    let aggregation = [
        { $match: { applyNo: applyNo } }
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};

exports.update = (applyNo, data, callback) => {

    var mQuery = { applyNo: applyNo };
    mongo.updateOne(mQuery, data, "signup", function (response) {
        callback(data.applyNo);
    })

};
exports.reject = (data, callback) => {

    var rejectedOn = new Date();
    var query = { applyNo: data.applyNo };
    var newValue = { status: "Rejected", "rejectedBy": data.uname, "rejectedOn": rejectedOn, "remark": data.remark };

    mongo.updateOne(query, newValue, "signup", function (response) {
        callback(response);
    })

};

exports.verify = (data, callback) => {

    var verifiedOn = new Date();
    var query = { applyNo: data.applyNo };
    var newValue = { status: "Verified", "VerifiedBy": data.uname, "verifiedOn": verifiedOn };

    mongo.updateOne(query, newValue, "signup", function (response) {
        callback(response);
    })

};
exports.getRejectedListForLifeTime = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Rejected", AppliedBy: userId } },
        { $match: { register: "lifeTime" } },
        { $sort : { AppliedOn: -1 }}
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.getRejectedListForOneYear = (userId, callback) => {

    let aggregation = [
        { $match: { status: "Rejected", AppliedBy: userId } },
        { $match: { register: "oneYear" } },
        { $sort : { AppliedOn: -1 }}
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.allVeririfiedData = function (callback) {

    let aggregation = [
        { $match: { status: "Verified" } },
        { $sort : { AppliedOn: -1 }}
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.approveReject = (data, callback) => {

    var rejectedOn = new Date().toLocaleDateString();
    var mQuery = { applyNo: data.applyNo };
    var newValue = { status: "Rejected", "rejectedBy": data.uname, "rejectedOn": rejectedOn, "remark": data.remark };

    mongo.updateOne(mQuery, newValue, "signup", function (response) {
        callback(response);
    })

};
exports.approved = (data, callback) => {

    var approvedOn = new Date().toLocaleDateString();
    var mQuery = { applyNo: data.applyNo };
    var newValue = { status: "Approve", "approvedBy": data.userId, "approvedOn": approvedOn };

    mongo.updateOne(mQuery, newValue, "signup", function (response) {
        callback(response);
    })

};

exports.trackPageForOneYear = (userId, callback) => {

    var aggregation = [
        { $match: { register: "oneYear", AppliedBy: userId } },
        { $project: { _id: 0 } }];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};
exports.trackPageForLifeTime = (userId, callback) => {

    var aggregation = [
        { $match: { register: "lifeTime", AppliedBy: userId } },
        { $project: { _id: 0 } }];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    })
};

exports.getApplicantDetail = (regNo, callback) => {

    var aggregation = [
        { $match: { registrationNo: regNo } },
        { $project: { _id: 0 } }
    ];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response[0])
    })
}

exports.allPendingData = (applyNo, callback) => {

    var aggregation = [
        { $match: { applyNo: applyNo } },
        { $project: { _id: 0 } },
        { $sort : { AppliedOn: -1 }}
    ];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response[0])
    })
}

exports.allRejectedgData = (applyNo, callback) => {

    var aggregation = [
        { $match: { applyNo: applyNo } },
        { $project: { _id: 0 } },
        { $sort : { AppliedOn: -1 }}
    ];
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response[0])
    })
}
exports.getAllApprovedDataForLifeTime = (userId, callback) => {
    let aggregation = [
        { $match: { register: "lifeTime", AppliedBy: userId } },
        { $match: { status: "Approve" } },
        { $sort : { AppliedOn: -1 }}
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.getAllApprovedDataForOneYear = (userId, callback) => {
    let aggregation = [
        { $match: { register: "oneYear", AppliedBy: userId } },
        { $match: { status: "Approve" } },
        { $sort : { AppliedOn: -1 }}
    ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.updateOne = (applyNo, data, callback) => {
    var mQuery = { applyNo: applyNo };
    mongo.updateOne(mQuery, data, "signup", function (response) {
        callback(data.applyNo);
    });
};
exports.getVaList = (callback) => {
    var aggregation = [
        { $match: { Role: "VA" } },
        { $project: { _id: 0, Name: 1, UserId: 1 } }];
    mongo.queryWithAggregator(aggregation, "userMaster", function (response) {
        callback(response);
    });
};
exports.getApplicationMode = (callback) => {
    var aggregation = [
        { $project: { _id: 0, mode: 1 } }];
    mongo.queryWithAggregator(aggregation, "config", function (response) {
        callback(response[0]);
    });
}
exports.getSubdivisionsOfDistrict = (districtCode, callback) => {
    var aggregation = [
        { $match: { districtCode: districtCode } },
        { $project: { subdivName: 1, subdivCode: 1, _id: 0 } },

    ];
    mongo.queryWithAggregator(aggregation, "subdivisionMaster", function (response) {
        callback(response);
    });
}
exports.validateToken = function (tokenNo, callback) {
    var aggregation = [
        { $match: { tokenNo: tokenNo } },
        
    ];
    mongo.queryWithAggregator(aggregation, "signup", function (response) {
        if (response.length == 0) {
            callback("");
        } else {
            callback(response[0].userId);
        }
    });
};
exports.getCatagory = function (callback) {

    var aggregation = [{ $project: { _id: 0, catagoryno: 1, catagory: 1 } }];

    mongo.queryWithAggregator(aggregation, "catagory", function (response) {
        callback(response);
    });
};
exports.getSubCatagories = function (catagoryno, callback) {
    var aggregation = [
        { $match: { catagoryno: catagoryno } },
        { $project: { _id: 0, subCatagoryno: 1, name: 1 } }];

    mongo.queryWithAggregator(aggregation, "subcatgory", function (response) {
        callback(response);
    });
};
exports.geturl = function (subCatagoryno, callback) {
    var aggregation = [
        { $match: { subCatagoryno: subCatagoryno } },
        { $project: { _id: 0, url: 1 } }];

    mongo.queryWithAggregator(aggregation, "url", function (response) {
        callback(response);
    });
};
exports.submitdata = function (data, callback) {

    mongo.insertDocument(data, 'submitdata', result => {
        callback(data);
    });
};
exports.getAllData = (callback) => {
    let aggregation = [

    ]
    mongo.queryWithAggregator(aggregation, 'submitdata', (response) => {
        callback(response)
    });
};
exports.loadAllState = (callback) => {
    let aggregation = [
      
        {
          
          '$group': {
            '_id': {
              'stateCode': '$permanentAddress.state.stateCode', 
              'stateName': '$permanentAddress.state.stateName'
            }, 
            'field1': {
              '$sum': 1
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'stateCode': '$_id.stateCode', 
            'stateName': '$_id.stateName', 
            'count': '$field1'
          }

        },
        { $sort: { stateCode: 1 } },
      ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};

exports.loadAllReligion = (callback) => {
    let aggregation = [
       
        {
          '$group': {
            '_id': {
              'religion': '$religion', 
            }, 
            'field1': {
              '$sum': 1
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'religion': '$_id.religion', 
            'count': '$field1'
          }

        },
        { $sort: { religion: 1 } },
      ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};
exports.loadAllGender = (callback) => {
    let aggregation =
    [
        {
          '$project': {
            'stateCode': '$permanentAddress.state.stateCode', 
            'stateName': '$permanentAddress.state.stateName', 
            'gender': '$gender'
          }
        }, {
          '$project': {
            'stateCode': 1, 
            'stateName': 1, 
            'maleCount': {
              '$cond': [
                {
                  '$eq': [
                    '$gender', 'Male'
                  ]
                }, 1, 0
              ]
            }, 
            'feMaleCount': {
              '$cond': [
                {
                  '$eq': [
                    '$gender', 'Female'
                  ]
                }, 1, 0
              ]
            }
          }
        }, {
          '$group': {
            '_id': {
              'stateCode': '$stateCode', 
              'stateName': '$stateName'
            }, 
            'males': {
              '$sum': '$maleCount'
            }, 
            'females': {
              '$sum': '$feMaleCount'
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'stateCode': '$_id.stateCode', 
            'stateName': '$_id.stateName', 
            'maleCount': '$males', 
            'femaleCount': '$females'
          }
        },
        { $sort: { stateCode: 1 } },
      ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};



exports.loadGender = (callback) => {
    let aggregation =
    [
        {
            '$group': {
              '_id': {
                'gender': '$gender', 
              }, 
              'field1': {
                '$sum': 1
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'gender': '$_id.gender', 
              'count': '$field1'
            }
  
          },
        
      ]
    mongo.queryWithAggregator(aggregation, 'signup', (response) => {
        callback(response)
    });
};

// exports.loadAllFemale =(callback)=>{
//     let aggregation =[
//         {
//           '$match': {
//             'gender': 'Female'
//           }
//         }, {
//           '$group': {
//             '_id': {
//               'stateCode': '$permanentAddress.state.stateCode', 
//               'stateName': '$permanentAddress.state.stateName'
//             }, 
//             'total': {
//               '$sum': 1
//             }
//           }
//         }, {
//           '$project': {
//             '_id': 0, 
//             'stateCode': '$_id.stateCode', 
//             'stateName': '$_id.stateName', 
//             'gender': '$_id.gender', 
//             'total': 1
//           }
//         }, {
//           '$sort': {
//             'stateName': 1
//           }
//         }
//       ]
//     mongo.queryWithAggregator(aggregation, 'signup', (response) => {
//         callback(response)
//     });
// }
// loadAllFemale();
// exports.geDataDummy = (callback) => {
//     let aggregation = [
//                        {$project:{_id:0,tokenNo:1,userId:1,name:1,registrationNo:1}}
//     ]
//     mongo.queryWithAggregator(aggregation, 'dummydata', (response) => {
//         callback(response)
//     });
// };
// function AI() {
//     let aggregation =
//     [
//         {
//             '$group': {
//               '_id': {
//                 'gender': '$gender', 
//               }, 
//               'field1': {
//                 '$sum': 1
//               }
//             }
//           }, {
//             '$project': {
//               '_id': 0, 
//               'gender': '$_id.gender', 
//               'count': '$field1'
//             }
  
//           },
//         { $sort: { stateCode: 1 } },
//       ]

//     mongo.queryWithAggregator(aggregation, 'signup', (response) => {
//         // callback(response)
//     });
// }
// AI();