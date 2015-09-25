var express = require('express');
var router = express.Router();
var userServices = require("../services/user-services");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res, next) {
  res.render("login/login");
});


router.post("/create", function(req, res, next) {
  userServices.addUser(req.body, function(err) {
    if (err) {
      var vm = {
        title: "Create an Account!",
        input: req.body,
        error: err
      };
      console.log("Delete!");
      delete vm.input.password;
      return res.render("login/login", vm);
    }
    res.redirect("/success");
  });
});

module.exports = router;
