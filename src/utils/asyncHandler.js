
//search middleware for handling async errors
const asyncHandler = (requestHandler)=>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err));
    }
}

export { asyncHandler };