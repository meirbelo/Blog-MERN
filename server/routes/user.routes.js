module.exports = app  => {

    var router  = require('express').Router();
    var user  =   require('../controllers/user.controller.js');

    router.get('/', user.getUserDetails);

    app.use('/api/user', router);

}