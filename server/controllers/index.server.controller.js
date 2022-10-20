
//File name: index.server.controller.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022




let express = require('express');
let router = express.Router();

let mongoose =require('mongoose');
let passport =require('passport');

let jwt = require('jsonwebtoken');
let DB = require('../config/development.js');


// create a User Model Instance
let userModel = require('../models/users.server.model');
let usersModel = userModel.usersModel;


////////////////display page///////////////////////////////

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}//have displayname display,else display blank

module.exports.displayAboutPage = (req, res, next) => {
    res.render('aboutMe', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectPage = (req, res, next) => {
    res.render('project', { title: 'Project', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('service', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contactMe', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}



////////////////Login///////////////////


module.exports.displayLoginPage = (req, res, next) => {
    //check login
    //if not yet login
    if(!req.user){
        res.render('users/login',{
            title:"Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? //if have user, return displayname
            req.user.displayName:'' //else dont display
        })

        }
        else{
            return res.redirect('/');
        }
    }


    module.exports.processLoginPage = (req, res, next) => {
        //user passport auth, local stragergy
        passport.authenticate('local',
        (err, user, info) => {
            //server error
            if(err)
            {
                return next(err);
            }
            //login error
            //user not found,show error,return to login
            if(!user)
            {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            //if no error, to contactlist
            req.login(user, (err) => {
                // server error
                if(err)
                {
                    return next(err);
                }

                return res.redirect('/contact-list');
            });
        })(req, res, next);
        //the above is a inner function
    }

/////////////////////////////display reg page///////////////////////////////////

module.exports.displayRegisterPage = (req, res, next) => {
    // not yet logged in
    if(!req.user)
    {
        res.render('users/registration',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ?//if have user, return displayname
            req.user.displayName:'' //else dont display
        });
    }
    else
    {
        return res.redirect('/');
    }
}
///////////////////////////process reg page///////////////////////////////////

module.exports.processRegisterPage = (req, res, next) => {
    // create user object
    let newUser = new usersModel({
        displayName: req.body.displayName,
        username: req.body.username,
        //password: req.body.password,//not clear text so no
        email: req.body.regemail
        
    });

    //pass password to reg to encrypt it
    usersModel.register(newUser, req.body.password, (err) => {
        //server error
        if(err)
        {
            console.log("Error: Inserting New User");
            console.log(err);
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('users/registration',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ?//if have user, return displayname
                req.user.displayName:'' //else dont display
            });
        }
        else
        {
            // if no error exists=>registration success=>redirect=>auth


            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}


//////////////////////logout////////////////////////////////////

module.exports.performLogout = (req, res, next) => {

    req.logout( function(err) {
        if (err) { return next(err); }
    res.redirect('/');
        
    }); //res.redirect('/');
    //req#logout requires a callback function??
    //->solve : put res.redirect inside req.login -->for ver 0.6.0?
    //->as a function?

}





