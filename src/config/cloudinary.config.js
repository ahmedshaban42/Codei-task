import { v2 as cloudinaryv2 } from "cloudinary";

export const cloudinary=()=>{
    cloudinaryv2.config({
        api_key:process.env.CLOUDINARY_KEY,
        api_secret:process.env.CLOUDINARY_SECRET,
        cloud_name:process.env.CLOUDINARY_NAME
    })
    return cloudinaryv2
}