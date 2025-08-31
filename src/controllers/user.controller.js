import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const resiterUser = asyncHandler(async (req, res) => {
  // Get user details from fromtend
  // validation , empty fields
  // check if user already exists : username , email
  // check for images , check for avatar
  // upload image to cloudinary , avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user created successfully
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  if (!fullName || !email || !username || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }

  // req.file // this is coming from multer
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log("req.file--------------: ", req.files);
  console.log("req -------------:", req);

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Could not upload avatar image , try again later");
  }

 const user=  await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser =await User.findById(user._id).select(
    "-password -refreshToken "  // removing password and refresh token from response
  )

  if(!createdUser){
    throw new ApiError(500,"User not created , try again later")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User created successfully")
   )

});
export { resiterUser };
