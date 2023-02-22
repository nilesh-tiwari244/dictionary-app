class customAPIError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode;
    }
}
const createCustomError=(message,statusCode)=>{
    return new customAPIError(message,statusCode);
}
// we have to export both of them
module.exports={customAPIError,createCustomError};