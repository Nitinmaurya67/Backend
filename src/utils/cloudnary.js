import { v2 as cloudinary } from "cloudinary"; // for cloudinary api , helps to upload image and video
import fs from "fs"; // file system module, for handling file operations



cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload image to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded on cloudinary, now we can remove it from local storage
    console.log("file has been uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove file from local storage , if error occurs while uploading on cloudinary
    console.log("error while uploading on cloudinary", error);
    return null;
  }
};

export { uploadOnCloudinary };
