module.exports = app => {
    const account = require("../controllers/account.controller.js");
    var router = require("express").Router();

    router.post("/register", account.registerUser);


    app.use("/account", router);

}
