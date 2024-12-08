import { asyncHandeler } from "../utils/asynchnandler.js";


const  registerUser = asyncHandeler( async (req, res) =>{
    return res.json({
        message:"ok"
    })
})

export default registerUser