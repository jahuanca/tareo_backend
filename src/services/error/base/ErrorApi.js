
class ErrorApi extends Error{
    
    constructor(statusCode, code , message){
        super(message)
        this.statusCode= statusCode
        this.code= code
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports=ErrorApi