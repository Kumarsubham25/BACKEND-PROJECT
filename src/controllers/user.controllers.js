import { asyncHandeler } from "../utils/asynchnandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudnary.js"
import ApiResponse from "../utils/ApiResponse.js"



const registerUser = asyncHandeler(async (req, res) => {

    const { username, email, fullname, avatar, password } = req.body

    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // }   its a type for writting logic 


    if (
        [username, email, fullname, avatar, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, " user with this email or name already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar image is mandatary")
    }


    const avtar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avtar image is mandatary")
    }


    const user = await User.create({
        fullname,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user_id).select(
        "-password -refreshToken "
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registring user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "user regiaterd successfully")
    )
})



export { registerUser }