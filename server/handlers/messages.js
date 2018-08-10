const mongoose = require("mongoose");
const db = require("../models");


//create a message
exports.createMessage = async function(req, res, next){
    try {
        //create the message in db
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id     // the route is api/users/:id/message
        });
        //add it to the user messages array
        let user = await db.User.findById(req.params.id);
        user.messages.push(message._id);
        //save to db
        await user.save();

        //we want to return a message as well as some user details of 'username' and 'profileImgUrl' - using populate
        let combinedMessage = await db.Message.findById(message._id).populate("user", {
            username: true,             //we mark as true the properties we want out of user
            profileImgUrl: true
        });

        return res.status(200).json(combinedMessage);

    } catch (err) {
        return next(err);
    }
};

//get a message
exports.getMessage = async function(req, res, next){
    try {

    } catch (err) {
        return next(err);
    }
};

//delete a message
exports.deleteMessage = async function(req, res, next){
    try {

    } catch (err) {
        return next(err);
    }
};