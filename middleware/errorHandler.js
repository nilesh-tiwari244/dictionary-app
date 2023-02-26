// now here the error can be of default type or our own custom created error
// so we will check wheter the error encountered is of custom error instance or not
const {customAPIError}=require('../errors/customError');
const errorHandler=(error,req,res,next)=>{
    if (error instanceof customAPIError){
        return res.status(error.statusCode).json(error.message)
    }
    res.status(500).json(error.errors.name.message);
}
module.exports=errorHandler;