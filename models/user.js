// This File Creates a new Mongoose Schema.
// Any objects pushed through this will see if the fields are correct.

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userServices = require("../services/user-services");

var userSchema = new Schema({
   firstName: {type: String, required: "Please Enter Your First Name"},
   lastName: {type: String, required: "Please Enter Your Last Name"},
   email: {type: String, required: "Please Enter Your Email Address"},
   password: {type: String, required: "Please Enter a Valid Password"},
   created: {type: Date, default: Date.now}
});

userSchema.path("email").validate(function(value, next) {
   userServices.findUser(value, function(err, user) {
      if (err) {
         console.log(err);
         return next(false);
      }
      next(!user);
   });
}, "That Email Is Already In Use!");

var User = mongoose.model("User", userSchema);
module.exports = {User: User};