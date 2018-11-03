var mongoose = require('mongoose');

var userschema = mongoose.Schema({

            firstname: {type: String,default:null, required:true, unique:true},

            lastname: {type: String,default:null},

            email: {type: String,default:null},

            mobile: {type: Number,default:null},

            password: {type: String,default:null},

            image: {data: Buffer, contentType: String},

            workingstatus: {type: String,default:null},

            interstedTech: {type: String,default:null},

            companyName: {type: String,default:null},

            designation: {type: String,default:null},

            workingOn: {type: String,default:null},

            collegeName: {type: String,default:null},
            
            yearOfPassing: {type: Number,default:null},

            stream: {type: String,default:null}
});

module.exports = mongoose.model('user',userschema);

