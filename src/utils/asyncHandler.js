
//search middleware for handling async errors
const asyncHandler = (requestHandler)=>{
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err));
    }
}