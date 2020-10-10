var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var DB = "ePermit";
var autoIncrement = require('mongodb-autoincrement');
var Binary = require('mongodb').Binary;
var fs = require('fs');
// verification autority applying autority approval autority 
exports.createCollection = function (collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.createCollection(collectionName, function (err, res) {
            if (err) throw err;
            ////console.log("Collection created!");
            callback(true);
            db.close();
        });
    });
};

exports.insertDocument = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).insertOne(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.removeDocument = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).remove(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.insertManyDocuments = function (myobj, collectionName, callback) {
    ////console.log(myobj);
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).insertMany(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.findOne = function (collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).findOne({}, function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAll = function (myobj, collectionName, callback) {
    ////console.log(myobj)
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllWithSkip = function (myobj,project,sort,skip,limit, collectionName, callback) {
    ////console.log(limit);
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj,project).sort(sort).skip(skip).limit(limit).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllProjection = function (myobj, project, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj, project).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllProjectionNameSort = function (myobj, project, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        ////console.log(project)
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj, project).sort({name:1}).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
            
        });
    });
};


exports.queryWithAggregator = function (aggregate, collectionName, callback) {
    // ////console.log(aggregate);
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).aggregate(aggregate).toArray(function (err, result) {
            if (err) throw err;
            // ////console.log(result);
            callback(result);
            db.close();
        });
    });
};


exports.queryFindAllSG = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj, { "sgList.$": 1 }).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.findAll = function (collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.short = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find().sort(myobj).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.autoIncrement = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db(DB);
        autoIncrement.getNextSequence(dbo, collectionName, function (err, autoIndex) {
            myobj.spID = autoIndex;
            myobj.applicationNumber = "APP/2018-19/" + autoIndex;
            callback(myobj);
            //save your code with this autogenerated id
        });
    });
};

exports.autoIncrementApp = function (appRef, collectionName, callback) {
    if (appRef == undefined) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            var dbo = db.db(DB);

            autoIncrement.getNextSequence(dbo, collectionName, function (err, autoIndex) {
                callback("APP/" + autoIndex);
            });

        });
    } else {
        callback(appRef);
    }
};

exports.autoIncrementSG = function (myobj, collectionName, callback) {
    ////console.log(myobj.district);
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db(DB);
        autoIncrement.getNextSequence(dbo, collectionName, function (err, autoIndex) {
            // myobj.spID = autoIndex;
            myobj.sgID = myobj.district.substring(0, 3) + "/" + autoIndex;
            callback(myobj);
            //save your code with this autogenerated id
        });
    });
};

exports.autoIncrementCrop = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db(DB);
        autoIncrement.getNextSequence(dbo, collectionName, function (err, autoIndex) {
            // myobj.spID = autoIndex;
            // ////console.log(data);
            var cropRegCode = collectionName + "-" + autoIndex;
            // myobj.sgID = data.sgID;
            // mynew.push(element);
            // ////console.log(mynew);
            callback(cropRegCode);
            //save your code with this autogenerated id
        });
    });
};

exports.short = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find().sort(myobj).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};


exports.updateOne = function (mquery, mvalue, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $set: mvalue };
        ////console.log(mquery);
        ////console.log(newvalues);
        dbo.collection(collectionName).updateOne(mquery, newvalues, function (err, res) {
            if (err) throw err;
            callback(true);
            ////console.log("1 document updated");
            db.close();
        });
    });
};


exports.updatePush = function (mquery, mvalue, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $push: mvalue };
        ////console.log(mquery);
        ////console.log(newvalues);
        dbo.collection(collectionName).update(mquery, newvalues, function (err, res) {
            if (err) throw err;
            callback(true);
            ////console.log("1 document updated");
            db.close();
        });
    });
};

exports.updateMany = function (mquery, mvalue, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $set: mvalue };
        ////console.log(mquery);
        ////console.log(newvalues);
        dbo.collection(collectionName).updateMany(mquery, newvalues, function (err, res) {
            if (err) throw err;
            callback(true);
            ////console.log("1 document updated");
            db.close();
        });
    });
};


exports.fileUpload = function (mfile, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        // var data = fs.readFileSync(mfile);
        var insert_data = {};
        insert_data.file_data = Binary(mfile);
        // ////console.log(Binary(mfile));
        dbo.collection('files').insertOne(insert_data, function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });

        // dbo.collection('files').findOne({}, function(err, documents) {
        //     ////console.log(documents);
        //     if (err) ////console.error(err);
        //         fs.writeFile('file_name', documents.file_data.buffer, function(err){
        //             if (err) throw err;
        //             ////console.log('Sucessfully saved!');
        //         });
        //   });
    });
};

//

// exports.findAndSave = function (collectionName, callback) {
//     MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db(DB);
//         dbo.collection(collectionName).findOne({}, function (err, result) {
//             if (err) throw err;
//             callback(result);
//             db.close();
//         });
//     });
// };

// db.seedGrowers.find({"cropList.blockCode":"398"}).forEach(function(doc) {
//     doc.cropList.forEach(function(element){
//     if(element.blockCode == "398") {
//        element.roCode = "5";
//        element.roName = "Ramnagar";
//     }
//     });
//     db.seedGrowers.save(doc);
// })

exports.queryFindSave = function (myobj,cropRegCode,collectionName, callback) {
    ////console.log(myobj)
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj).toArray(function (err, result) {
            if (err) throw err;
            result.forEach(sg => {
               sg.cropList.forEach(function(crop){
                   ////console.log("D: " +cropRegCode);
                if(crop.cropRegCode == cropRegCode) {
                    crop.weekOfSowing = "555";
                    crop.monthOfSowing = "DEMO DEMO";
                }
                dbo.collection(collectionName).save();
                db.close();
                callback(true);
                });
            });
        });
    });
};

// Project Specific Queries
exports.findSGNameAndPhoneNumber = function (obj, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var count = 0;
        var demo = [];
        obj.forEach(element => {
            dbo.collection("seedGrowers").find({"cropList.cropRegCode":element.cropRegCode}).toArray(function (err, result) {
                if (err) throw err;
                count = count + 1;
                element.name = result[0].name;
                element.phone = result[0].phone;
                var elem = {
                    cropRegCode: element.cropRegCode,
                    reportNo: element.reportNo,
                    subReportNo: element.subReportNo,
                    registeredArea: element.registeredArea,
                    inspectionArea: element.inspectionArea,
                    name: result[0].name,
                    phone: result[0].phone
                }
                demo.push(elem);
                // ////console.log(result[0].phone)

            });

            if(obj.lenght >= count) {
                // ////console.log(obj);
                callback(demo);
                db.close();
            }
        });
    });
};

exports.autoIncrementGodown = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var dbo = db.db(DB);
        autoIncrement.getNextSequence(dbo, collectionName, function (err, autoIndex) {
            myobj[0].godownId = autoIndex;
            callback(myobj);
        });
    });
};
exports.updateWithArrayFilter = function (mquery, mvalue,filter, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $set: mvalue };
        dbo.collection(collectionName).updateOne(mquery, newvalues,filter,function (err, res) {
            if (err) throw err;
            callback(res);
            db.close();
        });
    });
};

exports.updateWithArrayPush = function (mquery, mvalue,filter, collectionName, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $push: mvalue };
        dbo.collection(collectionName).updateOne(mquery, newvalues,filter,function (err, res) {
            if (err) throw err;
            callback(res);
            db.close();
        });
    });
};


exports.mongoConnection = function (callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        callback(db)
    });
};
exports.mongoClose = function (db, callback) {
    db.close();
};

exports.queryWithAggregatorLoop = function (aggregate, collectionName, db,callback) {
    var dbo = db.db(DB);
    dbo.collection(collectionName).aggregate(aggregate).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
};

exports.queryWithAggregatorPromise = function (aggregate, collectionName) {
    return new Promise(resolve => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(DB);
            dbo.collection(collectionName).aggregate(aggregate).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                db.close();
            });
        });
    });
};

