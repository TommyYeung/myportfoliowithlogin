
//File name: index.server.router.ejs
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 16/10/2022




let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index.server.controller');

// Get all page
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);
router.get('/aboutMe', indexController.displayAboutPage);
router.get('/service', indexController.displayServicesPage);
router.get('/project', indexController.displayProjectPage);
router.get('/contactMe', indexController.displayContactPage);



////login stuff////
//display login
router.get('/login', indexController.displayLoginPage);

//process longin
router.post('/login', indexController.processLoginPage);

//display reg
router.get('/registration', indexController.displayRegisterPage);

//process reg
router.post('/registration', indexController.processRegisterPage);

//process logout
router.get('/logout', indexController.performLogout);
/*
module.exports = function(app) {
app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
}
*/
/////////////////


module.exports = router;
