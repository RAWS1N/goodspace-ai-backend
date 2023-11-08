
// error middleware to handle error 
const ErrorMiddleware = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'
    res.status(err.statusCode).json({success:false,message:err.message})
}

// error instance to throw errors with statusCode and message
class ErrorHandler extends Error {
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode

    }
}


module.exports = {ErrorMiddleware,ErrorHandler}




