require('dotenv').config(); //making sure we have the environment variables
const jwt = require('jsonwebtoken');


//make sure the user is logged in (when doing certain activity) - Authentication
exports.loginRequire = function(req, res, next){
    try {
        //get token
        const token = req.headers.authorization.split(" ")[1]; //if user is logged the token will be available on 'authorization'

        //verify token
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){ //through decoded we get the 'payload'
            if(decoded){
                return next(); //user is logged
            } else{
                return next({
                    status: 401,    //status of unauthorized
                    message: "Please log in first"
                })
            }
        })
    } catch (err) { //in case headers.authorization is undefined or it is throwing some error
        return next({ status: 401, message: "Please log in first" });
    }
};

//make sure we get the correct user (so user X can't mess with what's belong to user Y - like comments etc.) - Authorization
exports.ensureCorrectUser = function(req, res, next){
    try {
        //get token
        const token = req.headers.authorization.split(" ")[1]; //if user is logged the token will be available on

        //verify token
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){ //through decoded we get the 'payload'
            if(decoded && decoded.id === req.params.id){    //here we check that the user specified in url id (/api/users/:id..)
                                                            //-> is matching to the logged in user
                return next(); //user is logged
            } else{
                return next({
                    status: 401,    //status of unauthorized
                    message: "Unauthorized"
                })
            }
        })
    } catch (err) { //in case headers.authorization is undefined or it is throwing some error
        return next({ status: 401, message: "Unauthorized" });
    }
};