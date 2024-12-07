import asyncHandeler from "../utils/asynchnandler.js"
import apiResponse from "../utils/apiResponse.js"

const healthCheck = asyncHandeler(async (req, res) => {
    return res
        .status(200)
        .jason(new apiResponse(200, "ok", "check passed"))
})
export { healthCheck }