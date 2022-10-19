
//File name: contact.server.router.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022




let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport=require('passport');


let contactController = require('../controllers/contact.server.controller');

//display List
router.get('/', contactController.displayContactList);



///////////////////// auth guard /////////////////
function requireAuth(req,res,next){
    //check login
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next()//moveon after check 
}

/////////////////can be used after auth//////////////////////////
//displaying the Add
router.get('/add', requireAuth, contactController.displayAddContact);

//processing the Add
router.post('/add', requireAuth, contactController.processAddContact);

//displaying the Edit
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

//processing the Edit
router.post('/edit/:id', requireAuth, contactController.processEditPage);

//Deletion
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;