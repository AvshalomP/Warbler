require("dotenv").config(); //using 'dotenv' to load all of our environment variables
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoute = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const db = require("./models");
const PORT = process.env.PORT || 8081;


/* Middleware */
app.use(cors());
app.use(bodyParser.json()); //we are using .json() since we are building an api


/* ROUTES */
// auth routes
app.use("/api/auth", authRoutes);
// message routes
app.use("/api/users/:id/messages",
    loginRequired,
    ensureCorrectUser,
    messagesRoute
);
//get all messages
app.use("/api/messages", loginRequired, async function(req, res, next){
   try{
       //find all messages
       let messages = await db.Message.find()   // find all messages
           .sort({ createdAt: "desc" })         // sort them by time created (descending)
           .populate("user", {                          // grab from each user: username and profileImgUrl
               username: true,
               profileImgUrl: true
           });

       //send all messages
       return res.status(200).json(messages);

   } catch(err){
       return next(err);
   }
});

/* Error Handling */
app.use(function(req, res, next){
   let err = new Error("Not Found");
   err.status = 404;
   next(err);
});

//our error handler so we won't get back an ugly html, rather clear message as json object
app.use(errorHandler);


//listener
app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
});