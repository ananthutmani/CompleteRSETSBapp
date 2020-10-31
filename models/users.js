var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isPESAdmin: { type: Boolean, default: false },
    isSBAdmin: { type: Boolean, default: false },
    isBlogAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
