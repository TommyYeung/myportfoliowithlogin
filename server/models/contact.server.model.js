

//File name: contact.server.model.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022





let mongoose = require('mongoose');


let contactModel = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);

