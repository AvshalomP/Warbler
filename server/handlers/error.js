
function errorHandler(error, req, res, next){ //this is referred as the error handler because it has 4 arguments ?
    return res.status(error.status || 500).json({
        message: error.message || "Oops something went wrong!"
    });
}

module.exports = errorHandler;