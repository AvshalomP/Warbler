const db = require("../models"); // this will fetch all of the db models from index.js
const jwt = require("jsonwebtoken");

exports.signin = function(){};

exports.signup = async function(req, res, next){
    try{
        // create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImgUrl} = user;
        // create a token (assigning a token)
        let token = jwt.sign({      //jwt.sign(<payload>,<privateKey>)
                id,
                username,
                profileImgUrl
            },
            process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImgUrl,
            token
        })
    } catch (err) {
        //if a mongoose validation fails - meaning we fail to create that user
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken";
        }
        // otherwise just send back a generic 400
        return next({
            status: 400,
            message: err.message
        })
    }
};