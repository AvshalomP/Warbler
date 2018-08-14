const Request   = require("request-promise");
//const database  = require("../../models"); // this will fetch all of the db models from index.js

// init basic options object
let options = {
    method: 'GET',
    uri: "http://localhost:8081/api/auth/",
    json: true // Automatically stringifies the body to JSON
};

//make signup request to server
exports._postSignup = function() {
    options.method  = 'POST';
    options.body    = { username: 'test', password: 'pass', email: 'test@test.com' };
    options.uri = "http://localhost:8081/api/auth/signup";
    //make a request
    return Request(options);
};

//make signin request to server
exports._postSignin = function(password, email) {
    options.method  = 'POST';
    options.body    = { password, email };
    options.uri = "http://localhost:8081/api/auth/signin";
    //make a request
    return Request(options);
};

//check if properties exist in response object
exports._propertiesExist = function(respBody, properties) {
    let hasAllProperties = true;
    //check if the response body has all properties expected
    properties.forEach((key) => {
        if (!respBody.hasOwnProperty(key)) {
            hasAllProperties = false;
        }
    });
    return hasAllProperties;
};

//Todo: need to close connection
//remove testing user from db
exports._removeTestUSerFromDb = async function(user) {
    try{
        //await database.User.deleteOne(user);
    } catch (err) {
        console.log(err);
    }
};