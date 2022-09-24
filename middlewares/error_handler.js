const CustomError = require("../custom_error");

const errorHandler = (error,req,res,next)=>{
        if (error instanceof CustomError) {
            res.status(error.status || 500).json(error);    
        } else {
            res.status(500).json({
                message: error.toString(),
                status: 500
            });
        }
}
const errorLogger = (error, request, response, next) => {
    console.log( `error ${error.message}`) 
    next(error) // calling next middleware
  }
  
  module.exports = {
    errorHandler: errorHandler,
    errorLogger: errorLogger,
  };
  