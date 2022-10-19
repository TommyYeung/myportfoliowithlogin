
//File name: contact.server.model.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022




let passportLocalMongoose=require('passport-local-mongoose');
let mongoose = require('mongoose');



let usersModel = mongoose.Schema({
    username:{
        type: String,
        default:'',
        trim: true,
        required: 'Username is required'
    },

    email:{
        type: String,
        default:'',
        trim: true,
        required: 'Email address is required'
    },
    displayName:{
        type: String,
        default:'',
        trim: true,
        required: 'Display user name is required'
    },
    created:{
        type: Date,
        default:Date.now,
    },
    update:{
        type: Date,
        default:Date.now,
    },
   


},

{
    collection: "users"
}

);

//options for users model


let options = ({ missingPasswordError: 'Wrong / Missing Password'});

usersModel.plugin(passportLocalMongoose, options);









module.exports.usersModel = mongoose.model('User', usersModel);

