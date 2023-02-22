const errorHandler=(error,req,res,next)=>{
    res.status(error.statusCode).json({msg:error.message});
}
module.exports=errorHandler;