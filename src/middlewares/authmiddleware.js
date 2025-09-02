import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unuthorized request !!");
    }
    const decodedeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedeToken?._id).select(
      "-password -refreshToken"
    );
  
      if (!user) {
          throw new ApiError(401, "Invailid Access token !!");
      }
  
      req.user = user;
      next();
  } catch (error) {

        throw new ApiError(401, error?.message || "Invailid Access token !!");
    
  }
});
