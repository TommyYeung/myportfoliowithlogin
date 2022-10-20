
//File name: server.js
//Student’s Name: Pok Hei Yeung
//StudentID: 301240885
//Date: 15/10/2022



/*
let indexRouter = require('./server/routes/index.server.router.js');
let contactRouter = require('./server/routes/contact.server.router');
*/
const app = require('./server/config/app');
/*
app.use('/', indexRouter);
app.use('/contact-list', contactRouter);
*/
var HOST = 'localhost'
const PORT = (process.env.PORT || '3000');
app.listen(PORT, console.log(`Server running at http://${HOST}:${PORT}/`));





