require("dotenv").config(); //using 'dotenv' to load all of our environment variables
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT;


/* Middleware */
app.use(cors());
app.use(bodyParser.json()); //we are using .json() since we are building an api


/* ROUTES */
// auth routes
app.use("/api/auth", authRoutes);

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