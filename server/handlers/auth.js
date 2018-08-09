const db = require("../models"); // this will fetch all of the db models from index.js
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    try {
        //finding a user (based on email)
        let user = await db.User.findOne({
            email: req.body.email
        });

        let { id, username, profileImgUrl } = user;
        //authenticating user password
        let isMatch = await user.comparePassword(req.body.password); //will hash the password entered and compare it with the one saved in our db
        console.log(isMatch);
        if(isMatch){    //if password is correct we want to return a token back (for kipping user logged on)
            let token = jwt.sign({
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

        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    } catch (err) {
        next({ status: 400, message: "Invalid Email/Password." })
    }

};

exports.signup = async function(req, res, next){
    try{
        // create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImgUrl} = user;
        // create a token (assigning a token)
        let token = jwt.sign({      //jwt.sign(<payload>, <privateKey>)
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
        //if a mongoose validation fails - meaning if req.body fail to obey the 'unique' field of the User model
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