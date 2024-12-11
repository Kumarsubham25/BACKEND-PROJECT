import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"
(async function () {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null
            // upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"


            })
            // file has been upload successfuly
            console.log("file has been upload successfuly", response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath) // remove the locally saved temperory file as upload operation got failed

        }
    }
}
)

export {uploadOnCloudinary}