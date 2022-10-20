
//File name: contact.server.controller.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022




let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Contact = require('../models/contact.server.model');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
          //sort aphabetically
          //contactList.sort((a, b) => a.firstname-(b.firstname))
            contactList.sort((a, b) => a.firstname.localeCompare(b.firstname))
            res.render('businessContact/list', 
            {title: 'Business Contact List', ContactList: contactList, 
            displayName: req.user ? req.user.displayName:'' });      
        }
    });
}

module.exports.displayAddContact = (req, res, next) => {
    res.render('businessContact/add', {title: 'Add New Contact',displayName: req.user ? req.user.displayName:''})          
}

module.exports.processAddContact = (req, res, next) => {

    let newContact = Contact({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh and redirect to the contact list
            res.redirect('/contact-list');
        }
    });

}




module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, edit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businessContact/edit', {title: 'Edit Contact', editContact: edit, displayName: req.user ? req.user.displayName:''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let update = Contact({
        "_id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.updateOne({_id: id}, update, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
  
            res.redirect('/contact-list');
        }
    });





}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {

             res.redirect('/contact-list');
        }
    });
}