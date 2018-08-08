const mongoose = require("mongoose");

mongoose.set("debug", true); //to see the mongo queries that run in the terminal
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/wrabler", {
    //making sure our connection is stable
    keepAlive: true,
    useNewUrlParser: true
});


module.exports.User = require("./user");