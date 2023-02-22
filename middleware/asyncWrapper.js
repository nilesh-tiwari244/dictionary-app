const asyncWrapper=(func)=>{
    return async (req,res,next)=>{// will pass this req,res,next to func // these are coming from rxpress
        try{
            await func(req,res,res);
        }
        catch(error){
            next(error);// passing this to next middleware (this is what next is used for)
        }
    }
}
module.exports=asyncWrapper;