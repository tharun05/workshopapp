
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://admin:admin@ds255258.mlab.com:55258/dlworkshop';
module.exports.init = function(){
    MongoClient.connect(url, function(err, db){
        if(!err){
            console.log('mongodb connected');
        }
        else{
            console.log(err);
        }
        module.exports.db = db;
    });
};
