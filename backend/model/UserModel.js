const {model} = require("mongoose");

const {UserSchema} = require("../schema/UserSchema");

const UserModel = new model("User", UserSchema);

module.exports = {UserModel};